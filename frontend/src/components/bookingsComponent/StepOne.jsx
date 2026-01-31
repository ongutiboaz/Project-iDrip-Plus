import React from "react";

export default function StepOne({
  bookingType,
  setBookingType,
  groupCount,
  adjustGroup,
  locationType,
  setLocationType,
  bookingDate,
  setBookingDate,
  time,
  setTime,
  address,
  setAddress,
  contact,
  setContact,
  handleNext,
}) {
  // Render address fields dynamically (skip country, which is fixed)
  const renderAddressFields = () =>
    Object.entries(address).map(([key, value]) => {
      if (key === "country") return null;

      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      return (
        <div className="form-group" key={key}>
          <label>{label}</label>
          <input
            type="text"
            placeholder={label}
            value={value || ""}
            onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
          />
        </div>
      );
    });

  return (
    <div className="step active">
      <h2>Booking Details</h2>

      {/* ---------- Booking Type ---------- */}
      <div className="card">
        <h3>Booking Type</h3>
        <div className="options">
          <button
            className={bookingType === "individual" ? "active" : ""}
            onClick={() => adjustGroup(1)}
          >
            Individual
          </button>
          <button
            className={bookingType === "group" ? "active" : ""}
            onClick={() => adjustGroup(Math.max(groupCount, 2))}
          >
            Group
          </button>
        </div>
      </div>

      {/* ---------- Group Count ---------- */}
      {bookingType === "group" && (
        <div className="card">
          <h3>Number of People</h3>
          <input
            type="number"
            min="2"
            value={groupCount}
            onChange={(e) => adjustGroup(Number(e.target.value))}
          />
        </div>
      )}

      {/* ---------- Location ---------- */}
      <div className="card">
        <h3>Location</h3>
        <div className="options">
          <button
            className={locationType === "clinic" ? "active" : ""}
            onClick={() => setLocationType("clinic")}
          >
            Clinic
          </button>
          <button
            className={locationType === "home" ? "active" : ""}
            onClick={() => setLocationType("home")}
          >
            Home / Office
          </button>
        </div>

        {locationType === "home" && (
          <div className="address-form">{renderAddressFields()}</div>
        )}
      </div>

      {/* ---------- Booking Date & Time ---------- */}
      <div className="card">
        <h3>Booking Date & Time</h3>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* ---------- Contact ---------- */}
      <div className="card">
        <h3>Contact</h3>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="+254712345678"
            value={contact.phone || ""}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={contact.email || ""}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
