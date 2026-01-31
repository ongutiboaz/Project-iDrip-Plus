import express from "express";
import multer from "multer";
import {
  createNutrientController,
  updateNutrientController,
  getNutrientsController,
  getNutrientByIdController,
  deleteNutrientController,
} from "../controllers/nutrient.controller.js";

const router = express.Router();

// Multer config

import upload from "../middleware/upload.middleware.js";

// Routes
router.get("/", getNutrientsController);
router.get("/:id", getNutrientByIdController);
router.post("/", upload.single("cover"), createNutrientController);

router.put("/:id", upload.single("cover"), updateNutrientController);
router.delete("/:id", deleteNutrientController);

export default router;
