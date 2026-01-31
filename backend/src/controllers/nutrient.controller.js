import fs from "fs";
import {
  createNutrient,
  updateNutrient,
  getNutrients,
  getNutrientById,
  deleteNutrient,
} from "../services/nutrient.service.js";

/* =========================
   HELPERS: JSON parse
========================= */
const parseArray = (value, fallback = []) => {
  if (!value) return fallback;
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return fallback;
  }
};

const parseObject = (value, fallback = {}) => {
  if (!value) return fallback;
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch {
    return fallback;
  }
};
/* =========================
   build Nutrient Data
========================= */

const buildNutrientData = (req) => {
  const body = req.body;
  const images = parseObject(body.images, {});

  return {
    id: body.id,
    name: body.name,
    category: body.category || "nutrient",
    componentType: body.componentType,
    benefits: parseArray(body.benefits),
    duration: body.duration || "5 mins",
    price: Number(body.price || 0),
    status: body.status || "active",
    images: {
      cover: req.file ? `/uploads/${req.file.filename}` : images.cover || "",
      nutrients: images.nutrients || [],
    },
  };
};

/* =========================
   Create Nutrient
========================= */

export const createNutrientController = async (req, res) => {
  try {
  
    const nutrientData = buildNutrientData(req);

    const nutrient = await createNutrient(nutrientData);

    res.status(201).json(nutrient);
  } catch (err) {
    console.error("CREATE NUTRIENT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   Update Nutrient
========================= */
export const updateNutrientController = async (req, res) => {
  try {
    const body = req.body;
    const nutrientId = req.params.id;
    const nutrientData = buildNutrientData(req);

    const updated = await updateNutrient(nutrientId, nutrientData);
    if (!updated) return res.status(404).json({ error: "Nutrient not found" });
    res.json(updated);
  } catch (err) {
    console.error("UPDATE NUTRIENT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   Get All Nutrients
========================= */
export const getNutrientsController = async (req, res) => {
  try {
    // Fetch all nutrients
    const nutrients = await getNutrients();
    // Return full nutrient objects, no mapping
    res.json(nutrients);
  } catch (err) {
    console.error("GET NUTRIENTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   Get Nutrient By ID
========================= */
export const getNutrientByIdController = async (req, res) => {
  try {
    const nutrient = await getNutrientById(req.params.id);
    if (!nutrient) return res.status(404).json({ error: "Nutrient not found" });
    res.json(nutrient); // includes populated nutrients/addons
  } catch (err) {
    console.error("GET NUTRIENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   Delete Nutrient
========================= */
export const deleteNutrientController = async (req, res) => {
  try {
    const nutrient = await deleteNutrient(req.params.id);
    if (!nutrient) return res.status(404).json({ error: "Nutrient not found" });
    // Delete cover image from server
    if (nutrient.images?.cover && fs.existsSync(`.${nutrient.images.cover}`)) {
      fs.unlinkSync(`.${nutrient.images.cover}`);
    }
    res.json({ message: "Nutrient deleted successfully" });
  } catch (err) {
    console.error("DELETE NUTRIENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
