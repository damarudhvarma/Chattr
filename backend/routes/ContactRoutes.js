import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import { searchContacts } from "../controllers/ContactControllers.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);

export default contactsRoutes;