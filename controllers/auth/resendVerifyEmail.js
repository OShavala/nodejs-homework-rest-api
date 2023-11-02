const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
require("dotenv").config();

const { BASE_URL } = process.env;

const sendEmail = require("../../helpers/sendEmail"); 

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
  };

  const emailSent = await sendEmail(verifyEmail); 
  if (!emailSent) {
 
  }

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;