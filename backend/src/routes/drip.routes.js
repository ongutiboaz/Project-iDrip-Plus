import express from "express";
import multer from "multer";
import {

  getDripsController,
  getDripByIdController,
  createDripController,
  updateDripController,
  deleteDripController
} from "../controllers/drip.controller.js";

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */

import upload from "../middleware/upload.middleware.js";

/* =========================
   ROUTES
========================= */
router.get("/", getDripsController);
router.get("/:id", getDripByIdController);
router.post("/", upload.single("cover"), createDripController);
router.put("/:id", upload.single("cover"), updateDripController);
router.delete("/:id", deleteDripController);
export default router;
