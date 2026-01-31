import BookingStatusBadge from "./BookingStatusBadge";
import BookingActions from "./BookingActions";
import { Clock } from "lucide-react";

export default function BookingRow({ booking }) {
  const formatPostedTime = (ts) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffHr < 24) return `${diffHr} hrs ago`;

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatBookingDateTime = (dt) => {
    if (!dt) return "-";
    const date = new Date(dt);

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addressText =
    booking.locationType === "clinic"
      ? "Clinic"
      : booking.address
      ? `${booking.address.apartment || ""} ${booking.address.houseNumber || ""} ${booking.address.city || ""}`.trim()
      : "-";

  return (
    <tr>
      {/* Booking Number */}
      <td>{booking.bookingNumber}</td>

      {/* Posted */}
      <td>
        <div className="posted-time">
          <Clock size={14} />
          {formatPostedTime(booking.createdAt)}
        </div>
      </td>

      {/* Booking Type + Location */}
      <td>
        {booking.bookingType} – {booking.locationType}
      </td>

      {/* Date & Time */}
      <td>{formatBookingDateTime(booking.bookingDateTime)}</td>

      {/* Address */}
      <td>{addressText}</td>

      {/* Contact */}
      <td>{booking.contact?.phone || "-"}</td>

      {/* Amount */}
      <td>
        KES {Number(booking.totalAmount || 0).toLocaleString("en-KE")}
      </td>

      {/* Status */}
      <td>
        <BookingStatusBadge status={booking.status} />
      </td>

      {/* Payment */}
      <td>{booking.paymentStatus}</td>

      {/* Actions */}
      <td>
        <BookingActions booking={booking} />
      </td>
    </tr>
  );
}
