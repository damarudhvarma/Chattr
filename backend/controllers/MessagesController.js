import Messages from "../models/MessagesModel.js";

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