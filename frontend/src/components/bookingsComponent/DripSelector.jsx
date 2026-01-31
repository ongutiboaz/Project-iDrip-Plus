import { useEffect, useState } from "react";
import AddonList from "./AddonList";
import "./DripSelector.scss";

export default function DripSelector({ client, index, drips = [], loading, updateClient }) {
  const [allNutrients, setAllNutrients] = useState([]);
  const [allShots, setAllShots] = useState([]);

  // ---------------------- FETCH NUTRIENTS & SHOTS ----------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/nutrients")
      .then((res) => res.json())
      .then(setAllNutrients)
      .catch(console.error);

    fetch("http://localhost:5000/api/shots")
      .then((res) => res.json())
      .then(setAllShots)
      .catch(console.error);
  }, []);

  const formatKES = (n) => (typeof n === "number" ? n.toLocaleString("en-KE") : "—");

  const selectedDrips = client.selectedDrips ?? [];
  const activeDripId = client.activeDripId ?? null;
  const activeDrip = selectedDrips.find((d) => d._id === activeDripId);

  // ---------------------- DRIP CLICK ----------------------
  const handleDripClick = (drip) => {
    const exists = selectedDrips.find((d) => d._id === drip._id);

    if (!exists) {
      updateClient(index, {
        selectedDrips: [
          ...selectedDrips,
          { ...drip, addons: { nutrients: [], shots: [] } },
        ],
        activeDripId: drip._id,
      });
      return;
    }

    if (activeDripId !== drip._id) {
      updateClient(index, { activeDripId: drip._id });
      return;
    }

    const remaining = selectedDrips.filter((d) => d._id !== drip._id);
    updateClient(index, {
      selectedDrips: remaining,
      activeDripId: remaining.at(-1)?._id ?? null,
    });
  };

  // ---------------------- TOGGLE ADDONS ----------------------
  const toggleAddon = (type, item) => {
    if (!activeDrip) return;

    const updatedDrips = selectedDrips.map((d) => {
      if (d._id !== activeDrip._id) return d;

      const current = d.addons[type] ?? [];
      const exists = current.some((i) => i._id === item._id);

      const newAddons = exists
        ? current.filter((i) => i._id !== item._id)
        : [...current, item];

      return { ...d, addons: { ...d.addons, [type]: newAddons } };
    });

    updateClient(index, { selectedDrips: updatedDrips });
  };

  const addonNutrients =
    activeDrip?.addonNutrients?.length
      ? allNutrients.filter((n) => activeDrip.addonNutrients.includes(n._id))
      : [];

  const addonShots =
    activeDrip?.addonShots?.length
      ? allShots.filter((s) => activeDrip.addonShots.includes(s._id))
      : [];

  // ---------------------- RENDER ----------------------
  if (loading) return <p>Loading drips...</p>;
  if (!drips.length) return <p>No drips available</p>;

  return (
    <div className="service-list">
      <h3>Select IV Drips</h3>

      <div className="service-options">
        {drips.map((drip) => {
          const isSelected = selectedDrips.some((d) => d._id === drip._id);
          const isActive = activeDripId === drip._id;

          return (
            <button
              key={drip._id}
              className={`pill ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}`}
              onClick={() => handleDripClick(drip)}
            >
              {drip.name} (KES {formatKES(drip.price)})
            </button>
          );
        })}
      </div>

      {activeDrip && (
        <>
          <AddonList
            title={`Add-on Nutrients for ${activeDrip.name}`}
            items={addonNutrients}
            selectedItems={activeDrip.addons.nutrients}
            onToggle={(n) => toggleAddon("nutrients", n)}
            formatKES={formatKES}
            emptyText="No nutrient add-ons available."
          />

          <AddonList
            title="Add-on Injections"
            items={addonShots}
            selectedItems={activeDrip.addons.shots}
            onToggle={(s) => toggleAddon("shots", s)}
            formatKES={formatKES}
            emptyText="No injection add-ons available."
          />
        </>
      )}
    </div>
  );
}
