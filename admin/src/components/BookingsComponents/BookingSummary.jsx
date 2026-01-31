import { Users, Clock, CheckCircle, CreditCard } from "lucide-react";

const BookingSummary = ({ bookings = [], onFilter }) => {
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;

  const totalPaid = bookings
    .filter((b) => b.payment === "paid")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  const totalUnpaid = bookings
    .filter((b) => b.payment !== "paid")
    .reduce((sum, b) => sum + Number(b.amount), 0);

  return (
    <div className="booking-summary">
      <SummaryCard
        type="total"
        icon={<Users />}
        label="Total Bookings"
        value={totalBookings}
        onClick={() => onFilter?.({})}
      />

      <SummaryCard
        type="pending"
        icon={<Clock />}
        label="Pending"
        value={pendingBookings}
        onClick={() => onFilter?.({ status: "pending" })}
      />

      <SummaryCard
        type="confirmed"
        icon={<CheckCircle />}
        label="Confirmed"
        value={confirmedBookings}
        onClick={() => onFilter?.({ status: "confirmed" })}
      />

      <SummaryCard
        type="paid"
        icon={<CreditCard />}
        label="Paid (KES)"
        value={totalPaid.toFixed(2)}
      />

      <SummaryCard
        type="unpaid"
        icon={<CreditCard />}
        label="Unpaid (KES)"
        value={totalUnpaid.toFixed(2)}
      />
    </div>
  );
};

const SummaryCard = ({ icon, label, value, type, onClick }) => (
  <div
    className={`summary-card ${type}`}
    onClick={onClick}
  >
    <div className="icon">{icon}</div>
    <div className="info">
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </div>
  </div>
);

export default BookingSummary;
