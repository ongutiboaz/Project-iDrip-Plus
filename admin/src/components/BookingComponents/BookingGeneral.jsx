export default function BookingGeneral({ type, date, location, address, time, phone, email }) {
  return (
    <div className="booking-general">
      <p><strong>Booking Type:</strong> {type}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
}
