const {META_PASSWORD} =process.env;
const nodemailer = require('nodemailer')

const nodemailerConfig={
    host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: 'romanovaolena@meta.ua',
    pass: META_PASSWORD,
  },
}

const transporter=nodemailer.createTransport(nodemailerConfig)

const sendEmail=async(data)=>{
    const email={
        ...data, from:'"Alex fullstack" <romanovaolena@meta.ua>'
    }
    try{
        await transporter.sendMail(email)
        return true
    }catch(error){
        return console.log(error.message)
    }
}

module.exports=sendEmail