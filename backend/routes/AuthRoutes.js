import { login, signup, getUserInfo } from "../controllers/AuthController.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";


const authRoutes= Router();

authRoutes.post('/signup',signup);
authRoutes.post('/login',login);
authRoutes.get('/user-info',verifyToken,getUserInfo);

export default authRoutes;