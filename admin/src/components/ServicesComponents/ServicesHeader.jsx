import { Plus, Search } from "lucide-react";
import "./ServicesHeader.scss";
import ButtonsToggle from "./ButtonsToggle";

export default function ServicesHeader({
  filters,
  onChange,
  activeType,
  onTypeChange,
  onAddService,
}) {
  return (
    <div className="services-header">
      {/* Left: Service type toggle */}
      <ButtonsToggle activeType={activeType} onChange={onTypeChange} />

      {/* Right: Search and filters */}
      <div className="services-header-actions">
        {/* Search input */}
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder={`Search ${activeType === "all" ? "services" : activeType}...`}
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
          />
        </div>

        {/* Status filter */}
        <select
          className="status-filter"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Add button */}
        <button
          type="button"
          className="add-btn primary"
          onClick={() => onAddService(activeType)}
        >
          <Plus size={16} />
          {activeType === "nutrients" && "Add Nutrient"}
          {activeType === "shots" && "Add Shot"}
          {activeType === "drips" && "Add IV Drip"}
          {activeType === "all" && "Add Service"}
        </button>
      </div>
    </div>
  );
}
