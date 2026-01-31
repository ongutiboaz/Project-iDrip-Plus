import BookingGeneral from "./BookingGeneral";
import BookingClient from "./BookingClient";
import BookingTotal from "./BookingTotal";

const clients = [
  {
    name: "Boaz Onguti",
    birthday: "2025-12-15",
    status: "travelling",
    drips: ["Hydration IV", "Immunity Boost", "Energy Boost"],
    addons: ["Vitamin C", "B12 Injection"],
    notes: "I love iDrip",
  },
  {
    name: "Irene Jerope",
    birthday: "2025-12-06",
    status: "local",
    drips: ["Decide at Home"],
    addons: [],
    notes: "Will decide at home",
  },
];

export default function BookingDetails() {
  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      <BookingGeneral
        type="Group"
        date="2025-12-16"
        location="Home / Office"
        address="501, Lavington, Nairobi, Kenya"
        time="12:16"
        phone="0705641405"
        email="ongutiboaz@gmail.com"
      />

      <h3>Clients</h3>
      {clients.map((client, idx) => (
        <BookingClient key={idx} client={client} />
      ))}

      <BookingTotal amount={17300} />
    </div>
  );
}
