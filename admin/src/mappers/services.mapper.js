export const mapNutrientToServiceRow = (n) => ({
  _id: n._id,
  id: n.id,
  name: n.name,
  type: n.componentType || "",
  category: n.category || "nutrient",
  price: n.price || 0,  
  duration: n.duration ,
  status: n.status || "active",
  benefits: n.benefits || [], // <--- added
  images: n.images || { cover: "" }, // <--- added
});

export const mapShotToServiceRow = (s) => ({
  _id: s._id,
  id: s.id, // e.g., shot-b12
  name: s.name,
  type: s.componentType || "", // vitamin, mineral, etc.
  category: s.category || "shot",
  price: s.price || 0,
  duration: s.duration || "5 mins",
  status: s.status || "active",
  benefits: s.benefits || [],
  indications: s.indications || [],
  contraindications: s.contraindications || [],
  nutrients: s.nutrients || [],
  faqs: s.faqs || [],
  description: s.description || "",
  howItWorks: s.howItWorks || "",
  images: s.images || { cover: "" },
  disclaimer:
    s.disclaimer ||
    "This injection is administered after clinical assessment by a licensed healthcare professional.",
});

export const mapDripToServiceRow = (d) => ({
  _id: d._id,
  id: d.id,
  name: d.name,
  type: d.componentType || "drip",
  category: d.category || "drip",
  price: d.price  || "30 mins",
  duration: d.duration,
  status: d.status,

  benefits: d.benefits || [],
  images: d.images || { cover: "" }, // ✅ SAME AS OTHERS

  // everything below is fine to keep (detail view)
  description: d.description || "",
  howItWorks: d.howItWorks || "",
  indications: d.indications || [],
  contraindications: d.contraindications || [],
  faqs: d.faqs || [],

  addonNutrients: d.addonNutrients || [],
  addonShots: d.addonShots || [],
  nutrients: d.nutrients || [],

  disclaimer: d.disclaimer || "",
  seo: d.seo || {},
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});
