import React from "react";
import { Plus, Layers, CheckCircle, XCircle, Calendar } from "lucide-react";
import "./ServicesStats.scss";

export default function ServicesStats({ services }) {
  const statCards = [
    {
      icon: <Plus />,
      label: "Total IV Drips",
      value: services.filter((s) => s.type === "iv-drip").length,
    },
    {
      icon: <CheckCircle />,
      label: "Active IV Drips",
      value: services.filter(
        (s) => s.type === "iv-drip" && s.status === "active"
      ).length,
    },
    {
      icon: <XCircle />,
      label: "Inactive IV Drips",
      value: services.filter(
        (s) => s.type === "iv-drip" && s.status === "inactive"
      ).length,
    },

    {
      icon: <Layers />,
      label: "Total Addons",
      value: services.filter((s) => s.type === "addon").length,
    },
    {
      icon: <CheckCircle />,
      label: "Active Addons",
      value: services.filter((s) => s.type === "addon" && s.status === "active")
        .length,
    },
    {
      icon: <XCircle />,
      label: "Inactive Addons",
      value: services.filter(
        (s) => s.type === "addon" && s.status === "inactive"
      ).length,
    },
  ];

  return (
    <div className="services-stats-grid">
      {statCards.map((card, idx) => (
        <div className="stat-card" key={idx}>
          <div className="icon">{card.icon}</div>
          <div className="label">{card.label}</div>
          <div className="value">{card.value}</div>
        </div>
      ))}
    </div>
  );
}
