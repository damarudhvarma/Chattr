import User from "../models/UserModel.js";


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