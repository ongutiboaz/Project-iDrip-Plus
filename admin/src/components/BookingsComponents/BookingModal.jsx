import React, { useState } from "react";
import DripOrShot from "./DripOrShot";
import "./BookingModal.scss";

export default function BookingModal({ booking, onClose }) {
  const [expandedClients, setExpandedClients] = useState({});

  if (!booking) return null;

  const toggleClient = (idx) =>
    setExpandedClients((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const formatKES = (n) =>
    typeof n === "number" ? n.toLocaleString("en-KE") : "—";

  const formatDateTime = (dt) =>
    dt
      ? new Date(dt).toLocaleString("en-KE", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const calculateAge = (dob) => {
    if (!dob) return "—";
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const renderAddress = () =>
    booking.locationType === "home"
      ? [
          booking.address?.city,
          booking.address?.apartment,
          booking.address?.houseNumber,
        ]
          .filter(Boolean)
          .join(", ")
      : "Clinic Visit";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* ================= HEADER ================= */}
        <div className="modal-header">
          <h2>Booking Details</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* ================= BOOKING INFO ================= */}
        <div className="booking-info">
          <Info label="Booking Number" value={booking.bookingNumber} />
          <Info
            label="Type"
            value={`${booking.bookingType} • ${booking.locationType}`}
          />
          <Info
            label="Date & Time"
            value={formatDateTime(booking.bookingDateTime)}
          />
          <Info label="Address" value={renderAddress()} />
          <Info
            label="Contact"
            value={[
              booking.contact?.phone,
              booking.contact?.email && `| ${booking.contact.email}`,
            ]
              .filter(Boolean)
              .join(" ")}
          />
          <Info label="Status" value={booking.status} />
          <Info label="Payment Status" value={booking.paymentStatus} />
          <Info
            label="Total Amount"
            value={`KES ${formatKES(booking.totalAmount)}`}
          />
        </div>

        {/* ================= CLIENTS ================= */}
        <h3>Clients</h3>
        <div className="clients-list">
          {booking.clients?.map((client, idx) => {
            const expanded = expandedClients[idx];

            return (
              <div key={client._id} className="client-card">
                {/* Client Header */}
                <div
                  className="client-header"
                  onClick={() => toggleClient(idx)}
                >
                  <strong>
                    {client.firstName} {client.secondName || ""}
                  </strong>
                  <span>KES {formatKES(client.total)}</span>
                  <button className="toggle-btn">{expanded ? "−" : "+"}</button>
                </div>

                {/* Client Body */}
                {expanded && (
                  <div className="client-details">
                    <Info label="Client Code" value={client.clientCode} />
                    <Info
                      label="Birthday"
                      value={
                        client.birthday
                          ? `${new Date(
                              client.birthday,
                            ).toLocaleDateString()} (${calculateAge(
                              client.birthday,
                            )} yrs)`
                          : "—"
                      }
                    />
                    <Info
                      label="Resident Status"
                      value={client.residentStatus || "Local Resident"}
                    />

                    {/* ================= SERVICES ================= */}
                    {!client.decideAtHome && (
                      <>
                        {/* DRIPS */}
                        {client.selectedDrips?.length > 0 && (
                          <Block title="Drips">
                            {client.selectedDrips.map((drip) => (
                              <DripOrShot
                                key={drip._id}
                                item={drip}
                                type="drip"
                                formatKES={formatKES}
                              />
                            ))}
                          </Block>
                        )}

                        {/* SHOTS */}
                        {client.selectedShots?.length > 0 && (
                          <Block title="Shots">
                            {client.selectedShots.map((shot) => (
                              <DripOrShot
                                key={shot._id}
                                item={shot}
                                type="shot"
                                formatKES={formatKES}
                              />
                            ))}
                          </Block>
                        )}
                      </>
                    )}

                    {client.decideAtHome && (
                      <p className="muted">Client will decide at home</p>
                    )}

                    {client.notes && (
                      <Info label="Notes" value={client.notes} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Info({ label, value }) {
  return (
    <div className="info-row">
      <span className="label">{label}:</span>
      <span className="value">{value || "—"}</span>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="block">
      <strong className="block-title">{title}</strong>
      <ul className="item-list">{children}</ul>
    </div>
  );
}
