import { useState } from "react";
import { Eye, Edit } from "lucide-react";
import BookingModal from "./BookingModal";

export default function BookingActions({ booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="booking-actions">
      {/* View Button */}
      <button
        onClick={() => setShowModal(true)}
        title="View Booking"
        className="action-btn view"
      >
        <Eye size={16} />
      </button>

      {/* Edit Button */}
      <button
        onClick={() => alert("Edit not implemented")}
        title="Edit Booking"
        className="action-btn edit"
      >
        <Edit size={16} />
      </button>

      {/* Booking Modal */}
      {showModal && (
        <BookingModal
          booking={booking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
