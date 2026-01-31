import fs from "fs";
import {
  createDrip,
  updateDrip,
  getDrips,
  getDripById,
  deleteDrip,
} from "../services/drip.service.js";

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
const buildDripData = (req) => {
  const body = req.body;
  const images = parseObject(body.images, {});

  return {
    id: body.id,
    name: body.name,
    category: body.category || "drip",
    componentType: body.componentType,
    description: body.description,
    howItWorks: body.howItWorks,
    duration: body.duration || "30 mins",
    price: Number(body.price || 0),
    status: body.status || "active",
    disclaimer: body.disclaimer || "",
    benefits: parseArray(body.benefits),
    indications: parseArray(body.indications),
    contraindications: parseArray(body.contraindications),
    faqs: parseArray(body.faqs),
    nutrients: parseArray(body.nutrients),
    addonNutrients: parseArray(body.addonNutrients),
    addonShots: parseArray(body.addonShots),
    seo: parseObject(body.seo),
    images: {
      cover: req.file ? `/uploads/${req.file.filename}` : images.cover || "",
      nutrients: images.nutrients || [],
    },
  };
};

/* =========================
   CREATE DRIP
========================= */
export const createDripController = async (req, res) => {
  try {
    const dripData = buildDripData(req);
    const drip = await createDrip(dripData);
    res.status(201).json(drip);
  } catch (err) {
    console.error("CREATE DRIP ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   UPDATE DRIP
========================= */
export const updateDripController = async (req, res) => {
  try {
    const dripId = req.params.id;
    const dripData = buildDripData(req);
    const updated = await updateDrip(dripId, dripData);

    if (!updated) return res.status(404).json({ error: "Drip not found" });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE DRIP ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   GET ALL DRIPS (for table)
========================= */

export const getDripsController = async (req, res) => {
  try {
    // Fetch all drips
    const drips = await getDrips();

    // Return full drip objects, no mapping
    res.json(drips);
  } catch (err) {
    console.error("GET DRIPS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET DRIP BY ID (detail view)
========================= */
export const getDripByIdController = async (req, res) => {
  try {
    const drip = await getDripById(req.params.id);

    if (!drip) return res.status(404).json({ error: "Drip not found" });

    res.json(drip); // includes populated nutrients/addons
  } catch (err) {
    console.error("GET DRIP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE DRIP
========================= */
export const deleteDripController = async (req, res) => {
  try {
    const drip = await deleteDrip(req.params.id);

    if (!drip) return res.status(404).json({ error: "Drip not found" });

    // Delete cover image from server
    if (drip.images?.cover && fs.existsSync(`.${drip.images.cover}`)) {
      fs.unlinkSync(`.${drip.images.cover}`);
    }

    res.json({ message: "Drip deleted successfully" });
  } catch (err) {
    console.error("DELETE DRIP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
