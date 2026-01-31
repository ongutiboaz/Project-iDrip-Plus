export default [
  /* =========================
     VITAMIN SHOTS
  ========================= */

  {
    id: "shot-b12",
    name: "Vitamin B12 Injection",
    category: "shot",
    
    componentType: "vitamin",
    // type: ["vitamin", "addon"],
    description:
      "An intramuscular Vitamin B12 injection used to correct deficiency and improve energy levels.",
    howItWorks:
      "Vitamin B12 is injected intramuscularly for rapid absorption, supporting nerve function and red blood cell production.",
    indications: [
      "Vitamin B12 deficiency",
      "Chronic fatigue",
      "Peripheral neuropathy",
      "Poor appetite",
    ],
    contraindications: [
      "Known hypersensitivity to cobalamin",
    ],
    benefits: [
      "Boosts energy levels",
      "Supports nerve function",
      "Improves red blood cell production",
    ],
    nutrients: ["nut-b12"],
    duration: "5 mins",
    price: 1500,
    status: "active",
    images: {
      cover: "/images/shots/b12-cover.jpg",
      nutrients: ["/images/nutrients/b12.png"],
    },
    faqs: [
      {
        question: "How often can I receive a Vitamin B12 injection?",
        answer:
          "Frequency depends on clinical assessment, but it is commonly given weekly or monthly.",
      },
      {
        question: "Is the injection painful?",
        answer:
          "Mild discomfort may be felt at the injection site, usually resolving quickly.",
      },
      {
        question: "Can I take supplements instead of the injection?",
        answer:
          "Oral supplements exist, but injections are faster and more effective for deficiencies.",
      },
    ],
  },

  {
    id: "shot-vitc",
    name: "Vitamin C Injection",
    category: "shot",
    componentType: "vitamin",
    // type: ["vitamin", "addon"],
    description:
      "A Vitamin C injection that supports immunity, skin health, and antioxidant protection.",
    howItWorks:
      "Vitamin C is delivered intramuscularly, bypassing the digestive system for better absorption.",
    indications: [
      "Low immunity",
      "Frequent infections",
      "Oxidative stress",
    ],
    contraindications: [
      "History of oxalate kidney stones",
    ],
    benefits: [
      "Boosts immune function",
      "Enhances collagen production",
      "Powerful antioxidant",
    ],
    nutrients: ["nut-vitc"],
    duration: "5 mins",
    price: 1200,
    status: "active",
    images: {
      cover: "/images/shots/vitc-cover.jpg",
      nutrients: ["/images/nutrients/vitamin-c.png"],
    },
    faqs: [
      {
        question: "How long before I notice effects?",
        answer:
          "Effects may vary, but immune support and energy can improve within a few days.",
      },
      {
        question: "Can it be combined with other injections?",
        answer:
          "Yes, but always under clinical supervision to ensure safety.",
      },
    ],
  },

  /* =========================
     MINERAL SHOTS
  ========================= */

  {
    id: "shot-magnesium",
    name: "Magnesium Injection",
    category: "shot",
    componentType: "mineral",
    // type: ["mineral", "addon"],
    description:
      "A magnesium injection used to support muscle relaxation and nervous system health.",
    howItWorks:
      "Magnesium is injected intramuscularly, helping regulate muscle and nerve function.",
    indications: [
      "Muscle cramps",
      "Stress",
      "Poor sleep",
    ],
    contraindications: [
      "Severe renal impairment",
    ],
    benefits: [
      "Relaxes muscles",
      "Reduces stress",
      "Improves sleep quality",
    ],
    nutrients: ["nut-magnesium"],
    duration: "5 mins",
    price: 1300,
    status: "active",
    images: {
      cover: "/images/shots/magnesium-cover.jpg",
      nutrients: ["/images/nutrients/magnesium.png"],
    },
    faqs: [
      {
        question: "How quickly will I feel the effects?",
        answer:
          "Muscle relaxation may be noticed within hours, depending on individual condition.",
      },
      {
        question: "Are there any side effects?",
        answer:
          "Mild flushing or warmth at the injection site can occur; serious effects are rare.",
      },
    ],
  },

  /* =========================
     ANTIOXIDANT SHOTS
  ========================= */

  {
    id: "shot-glutathione",
    name: "Glutathione Injection",
    category: "shot",
    componentType: "antioxidant",
    // type: ["antioxidant", "addon"],
    description:
      "A powerful antioxidant injection supporting detoxification and skin radiance.",
    howItWorks:
      "Glutathione is delivered intramuscularly to neutralize free radicals and support liver detox pathways.",
    indications: [
      "Oxidative stress",
      "Skin dullness",
      "Liver support",
    ],
    contraindications: [
      "Known hypersensitivity to glutathione",
    ],
    benefits: [
      "Enhances detoxification",
      "Improves skin radiance",
      "Reduces oxidative stress",
    ],
    nutrients: ["nut-glutathione"],
    duration: "5 mins",
    price: 2000,
    status: "active",
    images: {
      cover: "/images/shots/glutathione-cover.jpg",
      nutrients: ["/images/nutrients/glutathione.png"],
    },
    faqs: [
      {
        question: "Can it be used for skin whitening?",
        answer:
          "It improves skin radiance but should not be marketed as a whitening treatment.",
      },
      {
        question: "Is it safe to combine with other antioxidants?",
        answer:
          "Yes, but only under supervision to avoid overdosing.",
      },
    ],
  },

  /* =========================
     AMINO ACID SHOTS
  ========================= */

  {
    id: "shot-nac",
    name: "N-Acetylcysteine (NAC) Injection",
    category: "shot",
    componentType: "amino-acid",
    // type: ["amino-acid", "addon"],
    description:
      "An amino acid injection that supports liver detoxification and antioxidant production.",
    howItWorks:
      "NAC increases glutathione production, supporting detoxification and respiratory health.",
    indications: [
      "Liver support",
      "Chronic inflammation",
      "Oxidative stress",
    ],
    contraindications: [
      "Active asthma attack",
    ],
    benefits: [
      "Supports liver detox",
      "Boosts glutathione levels",
      "Reduces inflammation",
    ],
    nutrients: ["nut-nac"],
    duration: "5 mins",
    price: 1800,
    status: "active",
    images: {
      cover: "/images/shots/nac-cover.jpg",
      nutrients: ["/images/nutrients/nac.png"],
    },
    faqs: [
      {
        question: "Can I take NAC shots daily?",
        answer:
          "Frequency should be determined by a healthcare professional based on your condition.",
      },
      {
        question: "Are there any side effects?",
        answer:
          "Mild nausea or gastrointestinal discomfort can occur; serious reactions are rare.",
      },
    ],
  },
];
