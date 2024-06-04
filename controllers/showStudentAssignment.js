const Assignment=require("../Models/AssignmentModel");
const AssignAssignments=require("../Models/AssignAssignments");
const User=require("../Models/UserModel");
const multer = require('multer');
const jwt = require('jsonwebtoken');

module.exports=async(req,res)=>{
    
    try{
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, 'assignment');
        const sid = decoded.userId;
        // console.log(sid);
        const user= await User.findOne({_id:sid});
      
    
        const showAssignments= await AssignAssignments.find({sid:sid});
       
        if(showAssignments){
            res.status(200).json({"data":showAssignments,"status":200});
        }else{
            res.status(401).json({"message":"something went wrong","status":401});
        }
        
    
    }catch(error){
        console.log(error);
        res.status(500).json({"message":error,"status":500});
    }
}