import { Router } from "express";
import {
  createPartyPalaceController,
  deletePartyPalaceController,
  getAllPartyPalace,
  getOnePartyPalaceController,
  getPartyPalaceByCategory,
  getPartyPalaceByFilter,
  getTopLikedPartyPalace,
  likesController,
  removeUnavailableDatesController,
  updateImagesController,
  updatePartyPalaceController,
  updateUnavailableDatesController,
} from "../controllers/partypalace.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const partyPalaceRouter = Router();

partyPalaceRouter.post("/create", authMiddleware, createPartyPalaceController);
partyPalaceRouter.put(
  "/updateUnavailableDates",
  updateUnavailableDatesController
);
partyPalaceRouter.put(
  "/updateImages",
  upload.array("images"),
  authMiddleware,
  updateImagesController
);
partyPalaceRouter.patch("/update", authMiddleware, updatePartyPalaceController);
partyPalaceRouter.get("/get-one/:id", getOnePartyPalaceController);
partyPalaceRouter.get("/get-all", getAllPartyPalace);
partyPalaceRouter.put(
  "/removeUnavailableDates",
  removeUnavailableDatesController
);
partyPalaceRouter.delete(
  "/delete",
  authMiddleware,
  deletePartyPalaceController
);
partyPalaceRouter.put("/like", authMiddleware, likesController);
partyPalaceRouter.get(
  "/getByCategory",
  authMiddleware,
  getPartyPalaceByCategory
);
partyPalaceRouter.get("/topLiked", authMiddleware, getTopLikedPartyPalace);
partyPalaceRouter.post("/byFilter", authMiddleware, getPartyPalaceByFilter);

export default partyPalaceRouter;
