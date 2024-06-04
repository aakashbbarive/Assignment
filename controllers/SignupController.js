const User= require("../Models/UserModel");
const bcrypt=require('bcrypt');
module.exports= async(req,res)=>{
try{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const {firstname,lastname,email,password,role,userstatus,industry,contact}=req.body;
 if (!firstname || !lastname || !email || !password || !role || !industry||!contact) {
    return res.status(400).json({ message: 'All fields are required', status: 400 });
}
if(regex.test(email)==false){

    return res.status(400).json({ message: 'Please enter valid email', status: 400 });
}
if(password.length>=8 ){
    return res.status(400).json({ message: 'Password length must less than to 8 characters', status: 400 });
}
const alreadyEmail= await User.findOne({email:email});
const phone=await User.findOne({contact:contact});
if(alreadyEmail){
    return res.status(400).json({ message: 'Email is already Existed try different one', status: 400 });
}
if(phone){
    return res.status(400).json({ message: 'Contact Number  is already Existed try different one', status: 400 });
}
const dateofRegister = new Date(); 
 const passowrdHashed=await bcrypt.hash(password,10);
 const user=new User({firstname,lastname,email,contact,password:passowrdHashed,role,industry,userstatus,dateofRegister,profilepic:req.file?.filename??"",emailNotification:"false",InAppNotification:"false"});
 await user.save();
 res.status(200).json({"message":"User Signup successfully","status":200});

}catch(error){
    console.log(error);
    res.status(500).json({"message":error,"Status":500});
}
}