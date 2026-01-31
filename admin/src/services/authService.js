import api from "../utils/axiosConfig.js";

export const loginAdmin = async (email, password) => {
  const { data } = await api.post("/auth/admin/login", { email, password });
  return data;
};
