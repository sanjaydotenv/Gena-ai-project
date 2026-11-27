import { Router } from "express";
import chatController from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const route = Router();

route.post("/conversation", authenticate, chatController.convesationController);

route.get(
  "/get-all-conversation",
  authenticate,
  chatController.getAllConversationController,
);

route.get(
  "/get-all-messages/:conversationId",
  authenticate,
  chatController.getAllMessageByConersation,
);

export default route;
