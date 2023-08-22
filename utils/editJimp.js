const Jimp=require('jimp')

const editJimp= async(tempUpload)=>{
await Jimp.read(tempUpload)
    .then((image) => {
      return image
        .contain(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
        .write(tempUpload); 
    })
    .catch((err) => {
      console.error(err.message);
    });
}

module.exports=editJimp