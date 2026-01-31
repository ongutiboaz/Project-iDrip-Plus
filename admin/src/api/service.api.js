const BASE_URL = "http://localhost:5000/api";

/* =====================
   UTILS
===================== */
const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(
      ([_, v]) => v !== "" && v !== null && v !== undefined
    )
  );

const getEndpoint = (type) => {
  if (!type) throw new Error("Service type is required");

  switch (type) {
    case "nutrients":
      return `${BASE_URL}/nutrients`;
    case "shots":
      return `${BASE_URL}/shots`;
    case "drips":
      return `${BASE_URL}/drips`;
    default:
      throw new Error(`Invalid service type: ${type}`);
  }
};

/* =====================
   FETCH (LIST)
===================== */
export const fetchServices = async (type, params = {}) => {
  const endpoint = getEndpoint(type);
  const query = new URLSearchParams(cleanParams(params)).toString();

  const res = await fetch(`${endpoint}${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch services");

  return res.json();
};

/* =====================
   FETCH (SINGLE / VIEW)
===================== */
export const fetchServiceById = async (type, id) => {
  const endpoint = getEndpoint(type);

  const res = await fetch(`${endpoint}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch service");

  return res.json();
};

/* =====================
   CREATE
===================== */
export const createService = async (type, payload) => {
  const endpoint = getEndpoint(type);

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to create service");
  }

  return res.json();
};

/* =====================
   UPDATE
===================== */
export const updateService = async (type, id, payload) => {
  const endpoint = getEndpoint(type);

  const res = await fetch(`${endpoint}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to update service");
  }

  return res.json();
};

/* =====================
   DELETE
===================== */
export const deleteService = async (type, id) => {
  const endpoint = getEndpoint(type);

  const res = await fetch(`${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to delete service");
  }

  return true;
};
