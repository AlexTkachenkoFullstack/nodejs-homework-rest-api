const {User}=require('../../models/user')
const { HttpErrors } = require("../../helpers");
const fs=require('fs/promises')
const path=require('path');
const editJimp = require('../../utils/editJimp');

const updateAvatar=async(req, res, next)=>{
const{_id:id}=req.user
const{filename, path:tempUpload}=req.file;
if(!filename || !tempUpload){
    next(HttpErrors(400, 'Avatar not found'))
}
try{
   await editJimp(tempUpload)
    const [expectedResolution]=filename.split('.').reverse()
    const avatarName=`${id}.${expectedResolution}`
    const resultUpload=path.join(__dirname, '../../', 'public', 'avatars', avatarName)
    await fs.rename(tempUpload, resultUpload)
    const avatarURL=path.join('avatars', avatarName)
    await User.findByIdAndUpdate(id, {avatarURL}).exec()
    res.json({
        status:'success',
        code:200,
        avatarURL
    })
}catch(error){
    await fs.unlink(tempUpload)
    next(HttpErrors(500, 'Problem with uploading avatar'))
}
}

module.exports=updateAvatar