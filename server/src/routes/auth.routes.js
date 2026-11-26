import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validation/auth.validation.js";
import validateRequest from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const route = Router();

route.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.registerUserController,
);

route.post(
  "/login",
  loginValidator,
  validateRequest,
  authController.loginUserController,
);

route.post("/logout", authenticate, authController.logoutUserController);

route.get("/get-me", authenticate, authController.getMeUserController);

route.post("/token-rotation", authController.tokenRotationController);

export default route;
