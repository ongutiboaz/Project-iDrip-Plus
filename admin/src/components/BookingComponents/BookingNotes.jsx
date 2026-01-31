// src/pages/Bookings/BookingComponents/BookingNotes.jsx
export default function BookingNotes({ notes }) {
  if (!notes) return null;

  return (
    <div className="booking-notes">
      <p><strong>Notes:</strong> {notes}</p>
    </div>
  );
}
