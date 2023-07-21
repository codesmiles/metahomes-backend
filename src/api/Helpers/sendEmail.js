const { createTransporter } = require("../../Config/email");
const errorDey = require("./errorDey");
const logger = require("../Loggers/index");

const sendEmail = async (emailOptions) => {
  try {
    let emailTransporter = await createTransporter();
    const response = await emailTransporter.sendMail(emailOptions).catch((err) => { 
      logger.error(`Email Transporter Error: ${err}`);
    });
  }
  catch(err) {
    throw logger.error(errorDey(500, err, "Email Error"));
  }
};

module.exports = sendEmail;

// sendEmail({
//   subject: "Test",
//   text: "I am sending an email from nodemailer!",
//   to: "put_email_of_the_recipient",
//   from: process.env.EMAIL,
// });