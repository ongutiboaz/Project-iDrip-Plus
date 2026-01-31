import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.scss";

import StepOne from "../../components/bookingsComponent/StepOne";
import StepTwo from "../../components/bookingsComponent/StepTwo";
import BookingSummary from "../../components/bookingsComponent/BookingSummary";

export const EMPTY_CLIENT = {
  firstName: "",
  secondName: "",
  birthday: "",
  decideAtHome: false,
  serviceType: "none",
  selectedDrips: [],
  selectedShots: [],
  notes: "",
};

const EXTRA_CHARGE_CITIES = [
  "Ruiru",
  "Thika",
  "Kiambu",
  "Ngong",
  "Syokimau",
  "Mombasa",
  "Nakuru",
  "Eldoret",
  "Athi River",
  "Machakos",
  "Kitengela",
  "Limuru",
  "Juja",
  "Other",
];

export default function Booking() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("individual");
  const [groupCount, setGroupCount] = useState(1);
  const [locationType, setLocationType] = useState("clinic");

  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [time, setTime] = useState("");

  const [address, setAddress] = useState({
    country: "Kenya",
    city: "",
    apartment: "",
    houseNumber: "",
  });

  const [contact, setContact] = useState({ phone: "+254", email: "" });
  const [clients, setClients] = useState([{ ...EMPTY_CLIENT }]);

  const [drips, setDrips] = useState([]);
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH SERVICES ----------------
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const [dripsRes, shotsRes] = await Promise.all([
          fetch("http://localhost:5000/api/drips"),
          fetch("http://localhost:5000/api/shots"),
        ]);

        const dripsData = await dripsRes.json();
        const shotsData = await shotsRes.json();

        setDrips(dripsData.filter((d) => d.status === "active"));
        setShots(shotsData);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ---------------- TOTALS (UI ONLY) ----------------
  const clientsWithTotals = useMemo(() => {
    return clients.map((c) => {
      let total = 0;

      c.selectedDrips.forEach((d) => {
        total += d.price || 0;
        d.addons?.nutrients?.forEach((n) => (total += n.price || 0));
        d.addons?.shots?.forEach((s) => (total += s.price || 0));
      });

      c.selectedShots.forEach((s) => {
        total += s.price || 0;
        s.addons?.forEach((n) => (total += n.price || 0));
      });

      return { ...c, total };
    });
  }, [clients]);

  const totalAmount = useMemo(() => {
    let sum = clientsWithTotals.reduce((acc, c) => acc + c.total, 0);
    if (EXTRA_CHARGE_CITIES.includes(address.city)) sum += 1000;
    return sum;
  }, [clientsWithTotals, address.city]);

  // ---------------- CLIENT HELPERS ----------------
  const updateClient = (index, updates) => {
    setClients((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...updates } : c)),
    );
  };

  const adjustGroup = (num) => {
    if (num < 1) return;

    setGroupCount(num);
    setBookingType(num > 1 ? "group" : "individual");

    setClients((prev) => {
      const copy = [...prev];
      while (copy.length < num) copy.push({ ...EMPTY_CLIENT });
      while (copy.length > num) copy.pop();
      return copy;
    });
  };

  // ---------------- SAVE BOOKING ----------------
  const proceedToPayment = async () => {
  // ---------- VALIDATION ----------
  if (!time) {
    return alert("Please select a booking time");
  }

  for (let i = 0; i < clientsWithTotals.length; i++) {
    const c = clientsWithTotals[i];
    if (!c.firstName?.trim()) {
      return alert(`Client ${i + 1}: First name required`);
    }
    if (!c.decideAtHome && !c.selectedDrips.length && !c.selectedShots.length) {
      return alert(`Client ${i + 1}: Select at least one service`);
    }
  }

  // ---------- NORMALIZE CITY ----------
  const normalizedCity =
    address.city.charAt(0).toUpperCase() + address.city.slice(1).toLowerCase();

  // ---------- HELPERS ----------
  const mapNutrients = (items = []) =>
    items.map((n) => ({
      nutrientId: n._id,
      name: n.name,
      priceAtBooking: n.priceAtBooking ?? n.price ?? 0,
    }));

  const mapShots = (items = []) =>
    items.map((s) => ({
      shotId: s._id,
      name: s.name,
      priceAtBooking: s.priceAtBooking ?? s.price ?? 0,
    }));

  // ---------- MAP CLIENTS ----------
  const payloadClients = clientsWithTotals.map((c) => ({
    firstName: c.firstName,
    secondName: c.secondName,
    birthday: c.birthday,
    decideAtHome: c.decideAtHome,
    serviceType: c.serviceType,
    notes: c.notes || "",
    total: c.total, // UI-only, backend recalculates

    selectedDrips: c.selectedDrips?.map((d) => ({
      dripId: d._id,
      name: d.name,
      priceAtBooking: d.priceAtBooking ?? d.price ?? 0,
      addons: {
        nutrients: mapNutrients(d.addons?.nutrients),
        shots: mapShots(d.addons?.shots),
      },
    })) || [],

    selectedShots: c.selectedShots?.map((s) => ({
      shotId: s._id,
      name: s.name,
      priceAtBooking: s.priceAtBooking ?? s.price ?? 0,
      addons: mapNutrients(s.addons),
    })) || [],
  }));

  // ---------- BUILD PAYLOAD ----------
  const bookingPayload = {
    bookingType,
    bookingDateTime: new Date(`${bookingDate}T${time}`),
    locationType,
    address: { ...address, city: normalizedCity },
    contact,
    clients: payloadClients,
    totalAmount, // UI hint only — backend recalculates
    status: "pending",
  };

  // ---------- API CALL ----------
  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Booking failed");

    navigate("/payment", { state: { bookingId: data.bookingId } });
  } catch (err) {
    console.error("Booking save failed:", err);
    alert(err.message || "Booking failed");
  }
};

  

  
  
  

  
  
  

  
  
  
  
  
  
  
  
  

  
  
  

  
  
  
  
  

  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  

  
  

  
  
  
  
  
  















  // ---------------- RENDER ----------------
  return (
    <div className="booking-page">
      <div className="booking-container">
        {step === 1 && (
          <StepOne
            bookingType={bookingType}
            groupCount={groupCount}
            locationType={locationType}
            bookingDate={bookingDate}
            time={time}
            address={address}
            contact={contact}
            setBookingType={setBookingType}
            setGroupCount={setGroupCount}
            setLocationType={setLocationType}
            setBookingDate={setBookingDate}
            setTime={setTime}
            setAddress={setAddress}
            setContact={setContact}
            adjustGroup={adjustGroup}
            handleNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepTwo
            clients={clientsWithTotals}
            drips={drips}
            shots={shots}
            loading={loading}
            updateClient={updateClient}
            adjustGroup={adjustGroup}
            onBack={() => setStep(1)}
            proceedToPayment={proceedToPayment}
          />
        )}
      </div>

      <div className="booking-sidebar">
        <BookingSummary
          clients={clientsWithTotals}
          bookingType={bookingType}
          locationType={locationType}
          bookingDate={bookingDate}
          time={time}
          address={address}
          contact={contact}
          totalAmount={totalAmount}
        />
      </div>
    </div>
  );
}
