const imports = require("./imports");
const { bcrypt,
  authUserRepository,
  authUserTokenRepository,
  uuid,
  sendEmail,
  errorDey,
  logger,
  jwt,
  cacheDataWithExpiry,
  takeData
} = imports;

module.exports.signUpService = async (data) => {
  const email = data.email;
  const confirmMail = await authUserRepository.checkEmail(email);
  if (confirmMail) throw errorDey(409, "user already exist", "Database Error");

  const signedData = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
  const url = `${process.env.CLIENT_URL}/auth/save/${signedData}`;
 
   await sendEmail({
    subject: "Test Email",
    // text: ``,
      html: `<p>Kindly click on this link to complete your registration</p>
    <a href="${url}"><button styles="padding:2em;background-color:blue;">click Me</button></a>`,
    to: email,
    from: process.env.EMAIL,
   });

  return `Email sent to ${email} successfully`
  // return url;
};

module.exports.saveUserService = async (param) => { 

  if(!param) throw errorDey(409, "Invalid Token", "Database Error");
const data = jwt.verify(param, process.env.JWT_SECRET);
  
const { name, email, password, phone, role, referredBy, officeNumber } = data;

  const userData = { name, email, password, phone, role };
  
  const userBio = await authUserRepository.registerUser(userData);

  // developer
  if (userBio.generic.role === "developer") {
    const userId = userBio.generic.id;
    const DeveloperData = await authUserRepository.registerDeveloper(
      userId,
      officeNumber
    );

    return { userBio, DeveloperData };
  }

  // agent
  if (userBio.generic.role === "agent") {
    const agentData = await authUserRepository.registerAgent(
      userBio.generic.id,
      referredBy,
      officeNumber
    );
    return { userBio, agentData };
  }

  return userBio;
  
}

module.exports.forgetPasswordService = async (data) => {
  const email = data.email;
  const user = await authUserRepository.forgetPassword(email);
  
  logger.info("Generating Token...")
  const token = uuid().split("-").join("");

  // cache token
  await cacheDataWithExpiry(`token_${token}`, user,14400);
  // Rain check this in the future
  const url = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;

  logger.info("Sending Email")
  const mailer = await sendEmail({
    subject: "Test Email",
    // text: ``,
    html: `<p>click on this link to reset your password</p>
    <a href="${url}"><button>Reset password</button></a>`,
    to: email,
    from: process.env.EMAIL,
  });
  if (!mailer) throw errorDey(500, "Email not sent", `Email not sent`);
  logger.info("Email Sent Successfully")
  
  return {
    message: "Password reset link sent to your email",
    // url, //url for test purpose
  };
};

module.exports.resetPasswordService = async (data) => {
  const { password, token } = data;
  logger.info("Verifying...");
  const tokenUser = await takeData(`token_${token}`);
  if(!tokenUser) throw errorDey(409, "Invalid Token", "Database Error");

  logger.info("Comparing Passwords...")
  const isMatch = await bcrypt.compare(password,tokenUser.pwd);
  if (isMatch)
    throw errorDey(
      409,
      "Password is similar to old password",
      "Database Error"
    );
  
  logger.info("Resetting Password...")
  const response = await authUserRepository.resetPassword(
    password,
    tokenUser.id
  );
  return {message: response};
};
