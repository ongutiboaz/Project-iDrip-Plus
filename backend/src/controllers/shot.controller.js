import Shot from "../models/Shot.model.js";
import fs from "fs";
import {
  createShot,
  updateShot,
  getShots,
  getShotById,
  deleteShot,
} from "../services/shot.service.js";

/* =========================
   HELPER: Safe JSON parse for arrays
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
   build Shot Data
========================= */
const buildShotData = (req) => {
  const body = req.body;
  const images = parseObject(body.images, {});

  return {
    id: body.id,
    name: body.name,
    category: body.category || "shot",
    componentType: body.componentType,
    description: body.description,
    howItWorks: body.howItWorks,
    duration: body.duration || "5 mins",
    price: Number(body.price || 0),
    status: body.status || "active",
    disclaimer: body.disclaimer || "",
    benefits: parseArray(body.benefits),
    indications: parseArray(body.indications),
    contraindications: parseArray(body.contraindications),
    faqs: parseArray(body.faqs),
    nutrients: parseArray(body.nutrients),
    images: {
      cover: req.file ? `/uploads/${req.file.filename}` : images.cover || "",
      nutrients: images.nutrients || [],
    },
  };
};

/* =========================
   CREATE SHOT
========================= */
export const createShotController = async (req, res) => {
  try {
    const shotData = buildShotData(req);
    const shot = await createShot(shotData);

    res.status(201).json(shot);
  } catch (err) {
    console.error("CREATE SHOT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   UPDATE SHOT
========================= */
export const updateShotController = async (req, res) => {
  try {
    const shotId = req.params.id;
    const shotData = buildShotData(req);

    const updated = await updateShot(shotId, shotData);

    if (!updated) return res.status(404).json({ error: "Shot not found" });

    res.json(updated);
  } catch (err) {
    console.error("UPDATE SHOT ERROR:", err);
    res.status(400).json({ error: err.message });
  }
};

/* =========================
   GET ALL SHOTS
========================= */
export const getShotsController = async (req, res) => {
  try {
    const shots = await getShots();
    res.json(shots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET SHOT BY ID
========================= */
export const getShotByIdController = async (req, res) => {
  try {
    const shot = await getShotById(req.params.id);

    if (!shot) return res.status(404).json({ error: "Shot not found" });
    res.json(shot);
  } catch (err) {
    console.error("GET SHOT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE SHOT
========================= */
export const deleteShotController = async (req, res) => {
  try {
    const shot = await deleteShot(req.params.id);
    if (!shot) return res.status(404).json({ error: "Shot not found" });

    if (shot.images?.cover && fs.existsSync(`.${shot.images.cover}`)) {
      fs.unlinkSync(`.${shot.images.cover}`);
    }

    res.json({ message: "Shot deleted successfully" });
  } catch (err) {
    console.error("DELETE DRIP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
