const multer  = require('multer')
const path=require('path')
const { HttpErrors } = require('../helpers')

const tmpDir=path.join(__dirname,"../", "tmp" )

const storageAvatar=multer.diskStorage({
    destination:tmpDir,
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const uploadAvatar=multer({storage:storageAvatar, limits: 5000000, 
    fileFilter:(req, file, cb)=>{
        if(file.mimetype.includes('image')){
            cb(null, true)
            return
        }
        cb(HttpErrors(400, 'It should be image'))
    }})

module.exports=uploadAvatar