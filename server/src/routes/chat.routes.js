import { Router } from "express";
import chatController from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const route = Router();

route.post("/conversation", authenticate, chatController.convesationController);

export default route;
