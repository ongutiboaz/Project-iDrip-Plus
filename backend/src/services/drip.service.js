import Drip from "../models/drip.model.js";

/* =========================
   CREATE
========================= */
export const createDrip = async (data) => {
  return await Drip.create(data);
};

/* =========================
   UPDATE
========================= */
export const updateDrip = async (_id, data) => {
  return await Drip.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
};

/* =========================
   GET ALL (for table view)
========================= */
export const getDrips = async (filter = {}) => {
  return await Drip.find(filter || {}).sort({ createdAt: -1 });
};

/* =========================
   GET ONE (for detail view)
========================= */
export const getDripById = async (_id) => {
  return await Drip.findById(_id)
    // .populate("nutrients", "name benefits price images.cover")
    // .populate("addonNutrients", "name benefits price images.cover")
    // .populate("addonShots", "name benefits price images.cover");
};

/* =========================
   DELETE
========================= */
export const deleteDrip = async (_id) => {
  return await Drip.findByIdAndDelete(_id);
};
