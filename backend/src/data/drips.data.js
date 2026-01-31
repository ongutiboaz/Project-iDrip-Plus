

export default [
  {
    id: "drip-vitglow",
    name: "Vitaglow IV Drip",
    category: "drip",
    componentType: "antioxidant",
    type: ["antioxidant", "wellness"],
    description:
      "A premium antioxidant IV infusion supporting skin radiance, detoxification, and overall wellness.",
    howItWorks:
      "Vitaglow delivers antioxidants and essential nutrients directly into the bloodstream for maximum absorption, enhancing skin, hair, and overall wellness.",
    indications: [
      "Supports detoxification",
      "Promotes radiant skin",
      "Reduces oxidative stress",
    ],
    contraindications: [
      "Pregnancy without medical approval",
      "Severe liver or kidney disease",
    ],
    benefits: [
      "Boosts energy",
      "Enhances skin health",
      "Supports immune function",
    ],
    nutrients: ["nut-vitc", "nut-glutathione", "nut-nacl"], // Base nutrients
    addonNutrients: ["nut-bcomplex", "nut-coq10"],           // Optional nutrient addons
    addonShots: ["shot-b12", "shot-nac"],                   // Optional shot addons
    duration: "45–60 mins",
    Price: 6500,
    status: "active",
    images: {
      cover: "/images/services/vitaglow-cover.jpg",
      nutrients: [
        "/images/nutrients/vitamin-c.png",
        "/images/nutrients/glutathione.png",
        "/images/nutrients/nacl.png",
      ],
    },
    disclaimer:
      "All IV therapies are administered following medical consultation by a licensed healthcare professional.",
    seo: {
      title: "Vitaglow IV Drip | Premium IV Therapy",
      description:
        "Premium antioxidant IV drip supporting skin radiance, detoxification, and cellular repair.",
    },
  },

  {
    id: "drip-energize",
    name: "Energize IV Drip",
    category: "drip",
    componentType: "vitamin",
    type: ["energy", "wellness"],
    description:
      "A high-energy infusion designed to fight fatigue and support mental clarity.",
    howItWorks:
      "Energize delivers essential vitamins and minerals directly into the bloodstream to restore energy levels and mental focus quickly.",
    indications: ["Fatigue", "Stress", "Post-exercise recovery"],
    contraindications: ["Severe heart disease", "Pregnancy without approval"],
    benefits: [
      "Boosts energy and focus",
      "Reduces recovery time",
      "Supports immune system",
    ],
    nutrients: ["nut-bcomplex", "nut-magnesium"],
    addonNutrients: ["nut-vitc"],
    addonShots: ["shot-b12"],
    duration: "45–60 mins",
    basePrice: 6000,
    status: "active",
    images: {
      cover: "/images/services/energize-cover.jpg",
      nutrients: [
        "/images/nutrients/bcomplex.png",
        "/images/nutrients/magnesium.png",
      ],
    },
    disclaimer:
      "All IV therapies are administered following clinical assessment by a licensed healthcare professional.",
    seo: {
      title: "Energize IV Drip | Boost Energy & Recovery",
      description:
        "IV infusion to combat fatigue, restore energy, and support mental clarity.",
    },
  },
];
