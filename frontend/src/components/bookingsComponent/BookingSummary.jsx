import "./BookingSummary.scss";

const formatKES = (n) =>
  typeof n === "number" ? n.toLocaleString("en-KE") : "—";

// ---------------- TOTAL CALCULATIONS (UI ONLY) ----------------
const calculateClientTotal = (client) => {
  let total = 0;

  client.selectedDrips?.forEach((d) => {
    total += d.price || 0;
    d.addons?.nutrients?.forEach((n) => (total += n.price || 0));
    d.addons?.shots?.forEach((s) => (total += s.price || 0));
  });

  client.selectedShots?.forEach((s) => {
    total += s.price || 0;
    s.addons?.forEach((a) => (total += a.price || 0));
  });

  return total;
};

const calculateAge = (dob) => {
  if (!dob) return null;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export default function BookingSummary({
  clients = [],
  bookingDate,
  time,
  locationType,
  address = {},
  contact = {},
  bookingType,
  variant = "sidebar",
}) {
  const grandTotal = clients.reduce(
    (sum, c) => sum + calculateClientTotal(c),
    0
  );

  return (
    <div className={`booking-summary ${variant}`}>
      {/* ================= BOOKING DETAILS ================= */}
      <div className="summary-card">
        <h4>Booking Details</h4>

        <div className="summary-meta">
          <div className="meta-row">
            <span className="label">Type</span>
            <span className="value">{bookingType || "—"}</span>
          </div>

          <div className="meta-row">
            <span className="label">Location</span>
            <span className="value">
              {locationType === "home" ? "Home Visit" : "Clinic"}
            </span>
          </div>

          <div className="meta-row">
            <span className="label">Date</span>
            <span className="value">{bookingDate || "—"}</span>
          </div>

          <div className="meta-row">
            <span className="label">Time</span>
            <span className="value">{time || "—"}</span>
          </div>

          <div className="meta-row">
            <span className="label">Phone</span>
            <span className="value">{contact.phone || "—"}</span>
          </div>

          <div className="meta-row">
            <span className="label">Email</span>
            <span className="value">{contact.email || "—"}</span>
          </div>
        </div>

        {locationType === "home" && (
          <div className="address-block">
            <h5>Visit Address</h5>

            <div className="meta-row">
              <span className="label">Country</span>
              <span className="value">{address.country || "—"}</span>
            </div>

            <div className="meta-row">
              <span className="label">City</span>
              <span className="value">{address.city || "—"}</span>
            </div>

            <div className="meta-row">
              <span className="label">Apartment</span>
              <span className="value">{address.apartment || "—"}</span>
            </div>

            <div className="meta-row">
              <span className="label">House Number</span>
              <span className="value">{address.houseNumber || "—"}</span>
            </div>
          </div>
        )}
      </div>

      {/* ================= CLIENTS ================= */}
      <div className="summary-card">
        <h4>Clients</h4>

        {clients.map((client, idx) => {
          const age = calculateAge(client.birthday);
          const total = calculateClientTotal(client);

          return (
            <div key={idx} className="client-summary">
              <div className="client-header">
                <h5>
                  {client.firstName || "Client"} {client.secondName || ""}
                </h5>
                {age && <span className="age">{age} yrs</span>}
              </div>

              {client.decideAtHome ? (
                <p className="muted">Deciding at home</p>
              ) : (
                <>
                  {/* DRIPS */}
                  {client.selectedDrips?.map((d) => (
                    <div key={d._id} className="service-block">
                      <div className="service-line">
                        <span>{d.name}</span>
                        <strong>KES {formatKES(d.price)}</strong>
                      </div>

                      <div className="addon-list">
                        {d.addons?.nutrients?.map((n) => (
                          <div key={n._id} className="addon">
                            <span>+ {n.name}</span>
                            <span>KES {formatKES(n.price)}</span>
                          </div>
                        ))}
                        {d.addons?.shots?.map((s) => (
                          <div key={s._id} className="addon">
                            <span>+ {s.name}</span>
                            <span>KES {formatKES(s.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* SHOTS */}
                  {client.selectedShots?.map((s) => (
                    <div key={s._id} className="service-block">
                      <div className="service-line">
                        <span>{s.name}</span>
                        <strong>KES {formatKES(s.price)}</strong>
                      </div>

                      <div className="addon-list">
                        {s.addons?.map((a) => (
                          <div key={a._id} className="addon">
                            <span>+ {a.name}</span>
                            <span>KES {formatKES(a.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="client-total">
                    <span>Client Total</span>
                    <strong>KES {formatKES(total)}</strong>
                  </div>
                </>
              )}

              {client.notes && (
                <p className="comment">“{client.notes}”</p>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= GRAND TOTAL ================= */}
      <div className="grand-total">
        <span>Total Payable</span>
        <strong>KES {formatKES(grandTotal)}</strong>
      </div>
    </div>
  );
}
