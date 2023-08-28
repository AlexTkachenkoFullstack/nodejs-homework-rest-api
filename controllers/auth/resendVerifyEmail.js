const { HttpErrors } = require('../../helpers')
const {User}=require('../../models/user')
const {BASE_URL}=process.env
const {sendEmail}=require('../../helpers')
const resendVerifyEmail=async(req, res, next)=>{
    const {email}=req.body
    const user= await User.findOne({email}).exec()
    if(!user){
        throw HttpErrors(401, 'Email not found')
    }
    if(user.verify){
        throw HttpErrors(400, "Verification has already been passed")
    }
    const verifyEmail={
        to:email,
        subject: "Сonfirm your email",
        html:`<a href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click here to varify your email</a>`
    };
    await sendEmail(verifyEmail);
    res.json({
        message: "Verification email sent"
    })

}

module.exports=resendVerifyEmail