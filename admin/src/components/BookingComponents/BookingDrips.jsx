export default function BookingDrips({ drips, addons }) {
  return (
    <div className="booking-drips">
      <p><strong>Drips:</strong> {drips.join(", ")}</p>
      <p><strong>Add-ons:</strong> {addons.length > 0 ? addons.join(", ") : "None"}</p>
    </div>
  );
}
