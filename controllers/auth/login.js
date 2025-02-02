const bcrypt = require("bcryptjs");
const {User}=require('../../models/user')
const jwt=require('jsonwebtoken')
const {HttpErrors}=require('../../helpers')
 const {SECRET_KEY}= process.env
const login=async(req, res, next)=>{
    const {password, email}=req.body;
    const user=await User.findOne({email}).exec()
    if(!user?.verify){
        throw HttpErrors(401, "Email/password is wrong or you didn't confirm your email")
    }
    const passwordCompared=bcrypt.compareSync(password, user.password)
    if(!passwordCompared){
        throw HttpErrors(401, 'Email or password is wrong')
    }
    const payload={id:user._id}
    const token= jwt.sign(payload, SECRET_KEY, {expiresIn:'24h'})
    await User.findByIdAndUpdate(payload.id, {token}).exec()
    res.json({
        status:'success',
        code:200,
        token,
        user:{
            email: user.email,
            subscription: user.subscription,
            cover:user.avatarURL
        }
    })
}


module.exports=login