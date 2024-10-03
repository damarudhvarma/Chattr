import Messages from "../models/MessagesModel.js";
import {mkdirSync, renameSync} from "fs";
export const getMessages=  async (req,res,next)=>{
    try{
      
        const user1 = req.userId;
        const user2 = req.body.id;


      if(!user2||!user1){
        return res.status(400).send("Both userID's are required")
      }

        
        const messages = await Messages.find({
            $or:[{sender:user1,recipient:user2},{sender:user2,recipient:user1}],

        }).sort({timestamp:1});            

    return res.status(200).send({messages})
    } 
    catch(err){
        console.log(err);
       return res.status(500).send({message:err.message})
  }
  }
export const uploadFile=  async (req,res,next)=>{
    try{
      
   if(!req.file){
    return res.status(400).send("File is required")
   }

   const date = Date.now();
   let fileDir = `uploads/files/${date}` 
   let fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir,{recursive:true});

    renameSync(req.file.path,fileName);
   

    return res.status(200).json({filePath:fileName})
    } 
    catch(err){
        console.log(err);
       return res.status(500).send({message:err.message})
  }
  }