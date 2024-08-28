import { signup } from "../controllers/AuthController.js";
import { Router } from "express";


const authRoutes= Router();

authRoutes.post('/signup',signup);

export default authRoutes;