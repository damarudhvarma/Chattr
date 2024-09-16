import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import {compare} from 'bcrypt';
import {renameSync,unlinkSync} from 'fs'
const maxAge= 3*24*60*60*1000;

const createToken =(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{
        expiresIn: maxAge
    });
};

export const signup  = async (req,res,next)=>{
    try{
        const  {username,email,password} = req.body;
        if(!email || !password){
            res.send("Email && Password is requrided" )
        }
  const user = await User.create({email,password});
  res.cookie("jwt",createToken(email,user.id),{
    maxAge,
    secure:true,
    sameSite:"None"
  })
  res.status(201).json({user:{
    id:user.id,
    email:user.email,
    ProfileSetup:user.ProfileSetup

  }})

    }catch(err){
        console.log(err);
       return res.status(500).json({message:err.message})
  }
}

export  const login = async (req,res,next)=>{
  try{
      const  {username,email,password} = req.body;
      if(!email || !password){
          res.send("Email && Password is requrided" )
      }
const user = await User.findOne({email});
if(!user){
  return res.status(404).json({message:"User not found" })
}
const auth  = await compare(password,user.password);
if(!auth){
  return res.status(404).json({message:"Invalid Password" });
}

res.cookie("jwt",createToken(email,user.id),{
  maxAge,
  secure:true,
  sameSite:"None"
})
res.status(200).json({user:{
  id:user.id,
  email:user.email,
  ProfileSetup:user.ProfileSetup,
  firstName:user.firstname,
  lastName:user.lastName,
  color:user.color,

}})

  }catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}


export const getUserInfo = async (req,res,next)=>{
  try{
    const userData = await User.findById(req.userId)
    
    if(!userData){
      return res.status(404).send("User with the given id not found.")
    }
      
  return res.status(200).json(
    {
  id:userData.id,
  email:userData.email,
  ProfileSetup:userData.ProfileSetup,
  firstName:userData.firstName,
  lastName:userData.lastName,
  color:userData.color,
  image: userData.image
})

  }
  catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}


export  const updateProfile =  async (req,res,next)=>{
  try{
    const {userId} =req;
    const {firstName,lastName,color} = req.body;
    if(!firstName||!lastName){
      return res.status(400).send("firstname lastname and colour is required.")
    }
    const userData = await  User.findByIdAndUpdate(userId,{firstName,lastName,color,ProfileSetup:true},{new:true,runValidators:true})
      
  return res.status(200).json(
    {
  id:userData.id,
  email:userData.email,
  ProfileSetup:userData.ProfileSetup,
  firstname:userData.firstname,
  lastname:userData.lastname,
  color:userData.color,
})

  }
  catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}
export  const addProfileImage =  async (req,res,next)=>{
  try{
   if(!req.file){
    return res.status(400).send("Please upload a file")
   }
   const date = Date.now()
   let fileName= 'uploads/profiles/'+date +req.file.originalname
     renameSync(req.file.path,fileName)
     const updatedUser = await User.findByIdAndUpdate(req.userId,{image:fileName},{new:true,runValidators:true})

     return res.status(200).json({
      image:updatedUser.image,
     })
  }
  catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}


export const removeProfileImage=  async (req,res,next)=>{
  try{
    const {userId} =req;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    if(user.image){
      unlinkSync(user.image)
    } 
    user.image= null;
    await user.save()
    
  return res.status(200).send("profile image deleted ")
  }
  catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}