const current=async(req, res, next)=>{
    const {email, subscription}=req.user;
    res.json({
        status:'success',
        code:200,
        user:{
            email,
            subscription
          }
    })
}

module.exports=current