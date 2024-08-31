import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import {compare} from 'bcrypt';

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
  firstname:user.firstname,
  lastname:user.lastname,
  color:user.color,

}})

  }catch(err){
      console.log(err);
     return res.status(500).json({message:err.message})
}
}
