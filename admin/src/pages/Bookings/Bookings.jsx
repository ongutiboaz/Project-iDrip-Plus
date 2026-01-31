import { useEffect, useState } from "react";
import axios from "axios";

import BookingsHeader from "../../components/BookingsComponents/BookingsHeader";
import BookingsTable from "../../components/BookingsComponents/BookingsTable";
import BookingSummary from "../../components/BookingsComponents/BookingSummary";
import "./Bookings.scss";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: "",
    startDate: "",
    endDate: "",
    booktype: "",
    location: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // 🔹 FETCH BOOKINGS FROM DATABASE
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/bookings"
        );

        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error(
          "FETCH BOOKINGS ERROR:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading bookings…</p>;
  }

  return (
    <div className="bookings-page">
      <BookingSummary
        bookings={bookings}
        onFilter={(filter) =>
          setFilters((prev) => ({ ...prev, ...filter }))
        }
      />

      <BookingsHeader
        filters={filters}
        onChange={handleFilterChange}
      />

      <BookingsTable
        bookings={bookings}
        filters={filters}
      />
    </div>
  );
}
