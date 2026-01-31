import Shot from "../models/Shot.model.js";

export const createShot = async (data) => {
  return await Shot.create(data);
};

export const updateShot = async (_id, data) => {
  return await Shot.findByIdAndUpdate(_id, data, {
    new: true,
    runValidators: true,
  });
};

export const getShots = async (filter) => {
  return await Shot.find(filter || {}).sort({ createdAt: -1 });
};

export const getShotById = async (_id) => {
  return await Shot.findById(_id);
};

export const deleteShot = async (_id) => {
  return await Shot.findByIdAndDelete(_id);
};
