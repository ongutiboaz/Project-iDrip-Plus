import { Eye, Pencil, Trash2 } from "lucide-react";
import "./ServiceActions.scss";

export default function ServiceActions({ service, onView, onEdit, onDelete }) {
  if (!service) return null;

  return (
    <div className="service-actions">
      <button onClick={() => onView(service)} title="View">
        <Eye size={16} />
      </button>

      <button onClick={() => onEdit(service)} title="Edit">
        <Pencil size={16} />
      </button>

      <button onClick={() => onDelete(service)} title="Delete">
        <Trash2 size={16} />
      </button>
    </div>
  );
}
