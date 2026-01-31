import BookingFilters from "./BookingFilters";

export default function BookingsHeader({ filters, onChange }) {
  return (
    <div className="bookings-header">
      <h2>Bookings</h2>
      <BookingFilters filters={filters} onChange={onChange} />
    </div>
  );
}
