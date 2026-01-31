import Nutrient from "../models/Nutrient.model.js";

export const createNutrient = async (data) => {
  return await Nutrient.create(data);
};

export const updateNutrient = async (_id, data) => {
  return await Nutrient.findByIdAndUpdate(_id, data, { new: true, runValidators: true, });
};

export const getNutrients = async (filter) => {
  return await Nutrient.find(filter || {}).sort({ createdAt: -1 });
};

export const getNutrientById = async (_id) => {
  return await Nutrient.findById(_id);
};

export const deleteNutrient = async (_id) => {
  return await Nutrient.findByIdAndDelete(_id);
};
