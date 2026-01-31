import React, { useEffect, useState } from "react";
import "./Booking.scss";
import { useNavigate } from "react-router-dom";

const EMPTY_CLIENT = {
  firstName: "",
  secondName: "",
  birthday: "",
  decideAtHome: false,
  serviceType: null, // "drip" | "shot"
  selectedDrip: null,
  selectedShot: null,
  addons: [],
};

const Booking = () => {
  const navigate = useNavigate();

  /* ------------------- STATE ------------------- */
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("individual");
  const [groupCount, setGroupCount] = useState(1);

  const [locationType, setLocationType] = useState("clinic");
  const [bookingDate, setBookingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [time, setTime] = useState("");

  const [address, setAddress] = useState({
    country: "",
    city: "",
    appartment: "",
    houseNumber: "",
  });

  const [contact, setContact] = useState({ phone: "", email: "" });
  const [clients, setClients] = useState([{ ...EMPTY_CLIENT }]);

  const [drips, setDrips] = useState([]);
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ------------------- FETCH SERVICES ------------------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const [dripsRes, shotsRes] = await Promise.all([
          fetch("http://localhost:5000/api/drips"),
          fetch("http://localhost:5000/api/shots"),
        ]);
        const dripsData = await dripsRes.json();
        const shotsData = await shotsRes.json();

        setDrips(dripsData.filter((d) => d.status === "active"));
        setShots(shotsData);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* ------------------- CLIENT HELPERS ------------------- */
  const updateClient = (index, updates) => {
    setClients((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...updates } : c))
    );
  };

  const adjustGroup = (num) => {
    if (num < 1) return;

    setGroupCount(num);
    setBookingType(num > 1 ? "group" : "individual");

    setClients((prev) => {
      const updated = [...prev];
      while (updated.length < num) updated.push({ ...EMPTY_CLIENT });
      while (updated.length > num) updated.pop();
      return updated;
    });
  };

  const removeClient = (index) => {
    const updated = clients.filter((_, i) => i !== index);
    setClients(updated);
    adjustGroup(updated.length);
  };

  /* ------------------- TOTAL CALCULATION ------------------- */
  const calculateTotals = () =>
    clients.reduce((sum, c) => {
      if (c.decideAtHome) return sum;
      let total = 0;
      if (c.selectedDrip) total += c.selectedDrip.price;
      if (c.selectedShot) total += c.selectedShot.price;
      if (c.addons?.length) total += c.addons.reduce((a, b) => a + b.price, 0);
      return sum + total;
    }, 0);

  /* ------------------- NAVIGATION ------------------- */
  const goToPayment = () => {
    navigate("/payment", {
      state: {
        bookingType,
        locationType,
        bookingDate,
        time,
        address,
        contact,
        clients,
        totalAmount: calculateTotals(),
      },
    });
  };

  /* ------------------- RENDER ------------------- */
  return (
    <div className="booking-container">
      <div className="booking-main">
        {/* ----------------- STEP 1 ----------------- */}
        {step === 1 && (
          <div className="step active">
            <h2>Booking Type & Location</h2>

            {/* Booking Type */}
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
                  onClick={() => adjustGroup(2)}
                >
                  Group
                </button>
              </div>
            </div>

            {/* Group Count */}
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

            {/* Location & Contact */}
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
                <div className="address-form">
                  {Object.keys(address).map((key) => (
                    <input
                      key={key}
                      placeholder={key.replace(/([A-Z])/g, " $1")}
                      value={address[key]}
                      onChange={(e) =>
                        setAddress({ ...address, [key]: e.target.value })
                      }
                    />
                  ))}
                </div>
              )}

              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              <input
                placeholder="Phone"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
              <input
                placeholder="Email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>

            <button className="next-btn" onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        )}

        {/* ----------------- STEP 2 ----------------- */}
        {step === 2 && (
          <div className="step active">
            <h2>Client Details & Services</h2>

            {clients.map((client, idx) => (
              <div key={idx} className="client-card">
                {clients.length > 1 && (
                  <button onClick={() => removeClient(idx)}>Remove</button>
                )}

                {/* Client Info */}
                <input
                  placeholder="First Name"
                  value={client.firstName}
                  onChange={(e) =>
                    updateClient(idx, { firstName: e.target.value })
                  }
                />
                <input
                  placeholder="Second Name"
                  value={client.secondName}
                  onChange={(e) =>
                    updateClient(idx, { secondName: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={client.birthday}
                  onChange={(e) =>
                    updateClient(idx, { birthday: e.target.value })
                  }
                />

                {/* Decide at Home */}
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={client.decideAtHome}
                    onChange={(e) =>
                      updateClient(idx, {
                        decideAtHome: e.target.checked,
                        serviceType: null,
                        selectedDrip: null,
                        selectedShot: null,
                        addons: [],
                      })
                    }
                  />
                  <span className="slider" /> Decide at Home
                </label>

                {!client.decideAtHome && (
                  <>
                    {/* Service Type */}
                    <div className="options">
                      <button
                        className={
                          client.serviceType === "drip" ? "active" : ""
                        }
                        onClick={() =>
                          updateClient(idx, {
                            serviceType: "drip",
                            selectedDrip: null,
                            selectedShot: null,
                            addons: [],
                          })
                        }
                      >
                        Drips
                      </button>
                      <button
                        className={
                          client.serviceType === "shot" ? "active" : ""
                        }
                        onClick={() =>
                          updateClient(idx, {
                            serviceType: "shot",
                            selectedDrip: null,
                            selectedShot: null,
                            addons: [],
                          })
                        }
                      >
                        Shots
                      </button>
                    </div>

                    {/* ================= DRIPS ================= */}
                    {client.serviceType === "drip" && (
                      <div className="service-list">
                        {loading ? (
                          <p>Loading drips...</p>
                        ) : drips.length ? (
                          drips.map((d) => (
                            <div key={d._id} className="service-item">
                              <span
                                className={`pill ${
                                  client.selectedDrip?._id === d._id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  updateClient(idx, {
                                    selectedDrip: d,
                                    addons: [],
                                  })
                                }
                              >
                                {d.name} (KES {d.price.toLocaleString()})
                              </span>

                              {/* Drip Add-on Shots */}
                              {client.selectedDrip?._id === d._id &&
                                d.shots?.length > 0 && (
                                  <div className="addon-list">
                                    <h4>Add-ons</h4>
                                    <div className="addon-grid">
                                      {d.shots.map((shot) => (
                                        <div
                                          key={shot._id}
                                          className={`addon-card ${
                                            client.addons.some(
                                              (a) => a._id === shot._id
                                            )
                                              ? "selected"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            const exists = client.addons.some(
                                              (a) => a._id === shot._id
                                            );
                                            updateClient(idx, {
                                              addons: exists
                                                ? client.addons.filter(
                                                    (a) => a._id !== shot._id
                                                  )
                                                : [...client.addons, shot],
                                            });
                                          }}
                                        >
                                          <p>{shot.name}</p>
                                          <p>
                                            KES {shot.price.toLocaleString()}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))
                        ) : (
                          <p>No drips available</p>
                        )}
                      </div>
                    )}

                    {/* ================= SHOTS ================= */}
                    {client.serviceType === "shot" && (
                      <div className="service-list">
                        {loading ? (
                          <p>Loading shots...</p>
                        ) : shots.length ? (
                          shots.map((s) => (
                            <div key={s._id} className="service-item">
                              <span
                                className={`pill ${
                                  client.selectedShot?._id === s._id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  updateClient(idx, {
                                    selectedShot: s,
                                    addons: [],
                                  })
                                }
                              >
                                {s.name} (KES {s.price.toLocaleString()})
                              </span>

                              {/* Shot Add-on Nutrients */}
                              {client.selectedShot?._id === s._id &&
                                s.nutrients?.length > 0 && (
                                  <div className="addon-list">
                                    <h4>Add-ons</h4>
                                    <div className="addon-grid">
                                      {s.nutrients.map((n) => (
                                        <div
                                          key={n._id}
                                          className={`addon-card ${
                                            client.addons.some(
                                              (a) => a._id === n._id
                                            )
                                              ? "selected"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            const exists = client.addons.some(
                                              (a) => a._id === n._id
                                            );
                                            updateClient(idx, {
                                              addons: exists
                                                ? client.addons.filter(
                                                    (a) => a._id !== n._id
                                                  )
                                                : [...client.addons, n],
                                            });
                                          }}
                                        >
                                          <p>{n.name}</p>
                                          <p>KES {n.price.toLocaleString()}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))
                        ) : (
                          <p>No shots available</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            <button onClick={() => adjustGroup(clients.length + 1)}>
              + Add Person
            </button>

            <button onClick={() => setStep(1)}>Back</button>
            <button onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {/* ----------------- STEP 3 ----------------- */}
        {step === 3 && (
          <div className="step active">
            <h2>Review & Confirm</h2>

            {clients.map((c, i) => (
              <div key={i} className="review-card">
                <p>
                  <strong>Name:</strong> {c.firstName} {c.secondName}
                </p>
                <p>
                  <strong>Service:</strong>{" "}
                  {c.decideAtHome
                    ? "Decide at Home"
                    : c.selectedDrip
                    ? c.selectedDrip.name
                    : c.selectedShot
                    ? c.selectedShot.name
                    : "None"}
                </p>
                {c.addons?.length > 0 && (
                  <p>
                    <strong>Add-ons:</strong>{" "}
                    {c.addons.map((a) => a.name).join(", ")}
                  </p>
                )}
              </div>
            ))}

            <h3>Total: KES {calculateTotals().toLocaleString()}</h3>

            <button onClick={() => setStep(2)}>Back</button>
            <button onClick={goToPayment}>Proceed to Payment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
