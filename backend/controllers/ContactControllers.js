import Messages from "../models/MessagesModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const searchContacts=  async (req,res,next)=>{
    try{
      const {searchTerm} = req.body;
      if(searchTerm===undefined||searchTerm ===null){
        return res.status(400).send("searchTerm is required.")
      }

      const sanitizedSearchTerm = searchTerm.replace(/[.*+?^{}|[\]\\]/g, '\\$&');
      
        const searchRegex = new RegExp(sanitizedSearchTerm, 'i');
        const contacts = await User.find({
            $and:[{_id: { $ne:req.userId }},
            { $or: [{ firstName: searchRegex }, { lastName: searchRegex }, {email: searchRegex}] }

            ]});


    return res.status(200).send({contacts})
    } 
    catch(err){
        console.log(err);
       return res.status(500).json({message:err.message})
  }
  }


  export const getContactsForDMList=  async (req,res,next)=>{
    try{
     let  {userId} = req;
     userId = mongoose.Types.ObjectId(userId);
     const contacts = await Messages.aggregate([
        {
          $match:{
            $or:[{sender:userId},{recipient:userId}],
          },
        },

        {
          $sort:{timestamp:-1},
        },

        {
          $group:{
            _id:{
              $cond:{
                if:{$eq:['$sender',userId]}, 
                then:'$recipient',
                else:'$sender',
              },
            },
           lastMessageTime:{$first:"$timestamp"},
        },
      },
         {
           $lookup:{
             from:'users',
             localField:'_id',
             foreignField:'_id',
             as:'contactInfo',
           },
         },

         {
            $unwind:'$contactInfo',
         },
        {
          $project:{
            _id:1,
            lastMessageTime:1,
            firstName:'$contactInfo.firstName',
            lastName:'$contactInfo.lastName',
            email:'$contactInfo.email',
            image:'$contactInfo.image',
            color:'$contactInfo.color',
            
        },
      },

      {
        $sort:{lastMessageTime:-1},
      
      }

     ])
    

    return res.status(200).send({contacts})
    } 
    catch(err){
        console.log(err);
       return res.status(500).json({message:err.message})
  }
  }




  export const getAllContacts=  async (req,res,next)=>{
    try{
      const users  = await User.find({_id:{$ne:req.userId}}, "firstName lastName _id email");  
      const contacts = users.map(user=>({
        label: user.firstName ? `${user.firstName} ${user.lastName}`: user.email,
        value: user._id,

      }))


    return res.status(200).send({contacts})
    } 
    catch(err){
        console.log(err);
       return res.status(500).json({message:err.message})
  }
  }