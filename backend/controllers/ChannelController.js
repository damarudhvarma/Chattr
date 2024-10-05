import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const createChannel=  async (req,res,next)=>{
    try{
     const {name,members} = req.body;
     const userId = req.userId;
     const admin = await User.findById(userId);
     if(!admin){
       return res.status(404).send("User with the given id not found.")
     }

     const validMembers = await User.find({_id:{$in:members}}); 
        if(validMembers.length !== members.length){
        return res.status(400).send("Invalid members")
        }

        const newChannel = new Channel({name,admin:userId,members});

        await newChannel.save();
        return res.status(201).json({channel:newChannel});
    }
    catch(err){
        console.log(err);
       return res.status(500).send({message:err.message})
  }
  }
export const getUserChannels=  async (req,res,next)=>{
    try{
   const userId= new mongoose.Types.ObjectId(req.userId);
   const channels = await Channel.find({
    $or:[{admin:userId},{members:userId}],

   }).sort({updatedAt:-1});

     
        return res.status(201).json({channels});
    }
    catch(err){
        console.log(err);
       return res.status(500).send({message:err.message})
  }
  }