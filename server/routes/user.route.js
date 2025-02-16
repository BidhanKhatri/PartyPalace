import { Router } from "express";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.get("/logout", logoutController);

export default userRouter;
