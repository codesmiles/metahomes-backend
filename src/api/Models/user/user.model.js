const {mongoose} = require("../imports");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 10,
    },
    phone: {
      type: String,
      required: true,
      min: 11,
      max: 14,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "agent", "landlord", "developer"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  let update = this.getUpdate();
  if (!update.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(update.password, salt);
    update.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
