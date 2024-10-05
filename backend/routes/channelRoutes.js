import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import { createChannel, getChannelsMessages, getUserChannels } from '../controllers/ChannelController.js';
const channelRoutes = Router();

channelRoutes.post('/create-channel', verifyToken, createChannel)
channelRoutes.get('/get-user-channels', verifyToken, getUserChannels)
channelRoutes.get('/get-channels-messages/:channelId', verifyToken, getChannelsMessages)

export default channelRoutes;   
