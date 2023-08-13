const {Contact}=require("../../models/contact.js")
const getAll=async (req, res, next) => {
      const allContacts =await Contact.find({} , '-updatedAt -createdAt -__v').exec();
      console.log(allContacts)
      res.json({
        status: "success",
        code: 200,
        data: { allContacts },
      });
  }

  module.exports=getAll