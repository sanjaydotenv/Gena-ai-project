import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validation/auth.validation.js";
import validateRequest from "../middlewares/validateRequest.js";

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
export default route;
