import BookingDrips from "./BookingDrips";

export default function BookingClient({ client }) {
  return (
    <div className="booking-client">
      <h4>{client.name}</h4>
      <p><strong>Birthday:</strong> {client.birthday}</p>
      <p><strong>Status:</strong> {client.status}</p>

      <BookingDrips drips={client.drips} addons={client.addons} />
      <p><strong>Notes:</strong> {client.notes}</p>
    </div>
  );
}
