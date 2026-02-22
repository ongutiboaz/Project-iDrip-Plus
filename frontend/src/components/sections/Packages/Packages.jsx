import React from "react";
import PackageSection from "./PackageSection";
import "./Packages.scss";

// Dummy data with image instead of icon
const popularDrips = [
  {
    id: "drip1",
    name: "Hydration Drip",
    price: "KSh 5,500",
    popular: true,
    description:
    
      "Instant hydration to boost energy, improve recovery, and fight dehydration.",
    image:
      "https://images.unsplash.com/photo-1580281657527-47b9f0c4e3a3?q=80&w=800",
  },
  {
    id: "drip2",
    name: "Immunity Boost",
    price: "KSh 7,000",
    description:
      "Vitamin C, zinc, and antioxidants to strengthen your immune system.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800",
  },
   {
    id: "drip3",
    name: "Anti-Aging Drip",
    price: "KSh 8,500",
    description:
      "Vitamin C, zinc, and antioxidants to strengthen your immune system.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800",
  },
   {
    id: "drip4",
    name: "Immunity Boost",
    price: "KSh 7,000",
    description:
      "Vitamin C, zinc, and antioxidants to strengthen your immune system.",
    image:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800",
  },
];

const popularShots = [
  {
    id: "shot1",
    name: "B12 Energy Shot",
    price: "KSh 1,200",
    description: "Quick boost of energy, improves focus and metabolism.",
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=800",
  },
  {
    id: "shot2",
    name: "Vitamin C Shot",
    price: "KSh 1,000",
    description: "Strengthen your immunity with a potent vitamin shot.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800",
  },
   {
    id: "shot3",
    name: "Vitamin C Shot",
    price: "KSh 1,000",
    description: "Strengthen your immunity with a potent vitamin shot.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800",
  },
   {
    id: "shot4",
    name: "Vitamin C Shot",
    price: "KSh 1,000",
    description: "Strengthen your immunity with a potent vitamin shot.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800",
  },
];

const Packages = () => {
  return (
    <section className="packages">
      <PackageSection
        title="Popular Drips"
        subtitle="Our most requested IV therapy packages."
        packages={popularDrips}
      />
      <PackageSection
        title="Popular Shots"
        subtitle="Quick vitamin and energy shots."
        packages={popularShots}
      />
    </section>
  );
};

export default Packages;
