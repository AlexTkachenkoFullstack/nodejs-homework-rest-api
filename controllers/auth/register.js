const bcrypt = require("bcryptjs");
const {User}=require('../../models/user')
const {HttpErrors, sendEmail}=require('../../helpers')
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const{BASE_URL}=process.env

const register = async (req, res, next) => {
  const { password, email } = req.body;
  const user=await User.findOne({email}).exec()
  if(user){
    throw HttpErrors(409, 'Email in use')
  }
  const verificationToken=uuidv4()
  const avatarURL=gravatar.url(email);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser=await User.create({...req.body, password:hashPassword, avatarURL, verificationToken})
  const verifyEmail={
    to: email,
    subject: "Сonfirm your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click here to varify your email</a>`
  }
  await sendEmail(verifyEmail)
  await res.status(201).json({
    status:'success',
    code:201,
    user:{
      email: newUser.email,
      subscription: newUser.subscription,
      cover:newUser.avatarURL
    }
  })
};

module.exports = register;
