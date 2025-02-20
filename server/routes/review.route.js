import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createReviewController,
  getReviewController,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.post("/create", authMiddleware, createReviewController);
reviewRouter.get("/getReview", getReviewController);

export default reviewRouter;
