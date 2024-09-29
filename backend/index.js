import express from "express";
import cors from "cors";
import dotenv from  "dotenv";   
import cookieParser from "cookie-parser";
import mongoose from  "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";



dotenv.config();
const app = express();
app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PATCH","DELETE","PUT"],
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/profiles",express.static("uploads/profiles"));



const port = process.env.PORT || 3000;
const databaseURI= process.env.DATABASE_URI;


app.use('/api/auth',authRoutes);
app.use('/api/contacts',contactsRoutes);


mongoose.set('strictQuery', true)
mongoose.connect(databaseURI).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err.message);
})


const server = app.listen(port,()=>{
    console.log(`server listening on http://localhost:${port}` );

})