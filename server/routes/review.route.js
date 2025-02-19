import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReviewController } from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/create", authMiddleware, createReviewController);

export default reviewRouter;
