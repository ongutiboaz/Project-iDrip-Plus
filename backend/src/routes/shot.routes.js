import express from "express";
import multer from "multer";
import {
  createShotController,
  updateShotController,
  getShotsController,
  getShotByIdController,
  deleteShotController,
} from "../controllers/shot.controller.js";

const router = express.Router();

import upload from "../middleware/upload.middleware.js";

// Routes
router.get("/", getShotsController);
router.get("/:id", getShotByIdController);
router.post("/", upload.single("cover"), createShotController);
router.put("/:id", upload.single("cover"), updateShotController);
router.delete("/:id", deleteShotController);

export default router;
