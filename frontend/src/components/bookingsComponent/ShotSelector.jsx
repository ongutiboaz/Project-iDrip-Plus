import { useEffect, useState } from "react";
import AddonList from "./AddonList";
import "./ShotSelector.scss";

export default function ShotSelector({ client, index, shots = [], loading, updateClient }) {
  const [allNutrients, setAllNutrients] = useState([]);

  // ---------------------- FETCH NUTRIENTS ----------------------
  useEffect(() => {
    fetch("http://localhost:5000/api/nutrients")
      .then((res) => res.json())
      .then(setAllNutrients)
      .catch(console.error);
  }, []);

  const formatKES = (n) => (typeof n === "number" ? n.toLocaleString("en-KE") : "—");

  const selectedShots = client.selectedShots ?? [];
  const activeShotId = client.activeShotId ?? null;
  const activeShot = selectedShots.find((s) => s._id === activeShotId);

  // ---------------------- SHOT CLICK ----------------------
  const handleShotClick = (shot) => {
    const exists = selectedShots.find((s) => s._id === shot._id);

    if (!exists) {
      updateClient(index, {
        selectedShots: [...selectedShots, { ...shot, addons: [] }],
        activeShotId: shot._id,
      });
      return;
    }

    if (activeShotId !== shot._id) {
      updateClient(index, { activeShotId: shot._id });
      return;
    }

    const remaining = selectedShots.filter((s) => s._id !== shot._id);
    updateClient(index, {
      selectedShots: remaining,
      activeShotId: remaining.at(-1)?._id ?? null,
    });
  };

  // ---------------------- TOGGLE ADDONS ----------------------
  const toggleAddon = (nutrient) => {
    if (!activeShot) return;

    const updatedShots = selectedShots.map((s) => {
      if (s._id !== activeShot._id) return s;

      const currentAddons = s.addons ?? [];
      const exists = currentAddons.some((a) => a._id === nutrient._id);

      return {
        ...s,
        addons: exists
          ? currentAddons.filter((a) => a._id !== nutrient._id)
          : [...currentAddons, nutrient],
      };
    });

    updateClient(index, { selectedShots: updatedShots });
  };

  // ---------------------- RENDER ----------------------
  if (loading) return <p>Loading shots...</p>;
  if (!shots.length) return <p>No shots available</p>;

  const addonNutrients =
    activeShot?.nutrients?.length && allNutrients.length
      ? allNutrients.filter((n) => activeShot.nutrients.includes(n._id))
      : [];

  return (
    <div className="service-list">
      <h3>Select Injections / Shots</h3>

      <div className="service-options">
        {shots.map((shot) => {
          const isSelected = selectedShots.some((s) => s._id === shot._id);
          const isActive = activeShotId === shot._id;

          return (
            <button
              key={shot._id}
              className={`pill ${isSelected ? "selected" : ""} ${isActive ? "active" : ""}`}
              onClick={() => handleShotClick(shot)}
            >
              {shot.name} (KES {formatKES(shot.price)})
            </button>
          );
        })}
      </div>

      {activeShot && (
        <AddonList
          title={`Add-ons for ${activeShot.name}`}
          items={addonNutrients}
          selectedItems={activeShot.addons ?? []}
          onToggle={toggleAddon}
          formatKES={formatKES}
          emptyText="No add-ons available for this injection."
        />
      )}
    </div>
  );
}
