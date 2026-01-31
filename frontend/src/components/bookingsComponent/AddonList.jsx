
import React from "react";
import "./AddonList.scss";


export default function AddonList({
  title,
  items = [],
  selectedItems = [],
  onToggle,
  formatKES,
  emptyText,
}) {
  if (!items.length) {
    return <p>{emptyText}</p>;
  }

  return (
    <div className="addon-list">
      <h4>{title}</h4>

      {items.map((item) => {
        const isSelected = selectedItems.some(
          (x) => x._id === item._id
        );

        return (
          <button
            key={item._id}
            type="button"
            className={`pill ${isSelected ? "selected" : ""}`}
            aria-pressed={isSelected}
            onClick={() => onToggle(item)}
          >
            {item.name} (KES {formatKES(item.price)})
          </button>
        );
      })}
    </div>
  );
}
