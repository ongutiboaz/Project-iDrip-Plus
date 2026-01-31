import BookingRow from "./BookingRow";

export default function BookingsTable({ bookings = [] }) {
  if (!bookings.length) {
    return (
      <div className="bookings-table empty">
        <p>No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="bookings-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Posted</th>
            <th>Booking Type</th>
            <th>Date</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingRow
              key={booking._id}  
              booking={booking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
