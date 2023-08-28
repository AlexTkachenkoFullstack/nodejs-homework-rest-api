const { HttpErrors } = require('../../helpers');
const {User}=require('../../models/user')
const verifyEmail=async(req, res, next)=>{
    const {verificationToken}=req.params;
    console.log(verificationToken)
    const user=await User.findOne({verificationToken}).exec()
    console.log(user)
    if(!user){
        throw HttpErrors(404, "User not found")
    }
    await User.findByIdAndUpdate(user._id, {verify:true, verificationToken:null}).exec()
    res.json({
        message: 'Verification successful'
    })
}

module.exports=verifyEmail