import React from "react";

const BookingFilters = ({ filters, onChange }) => {
  return (
    <div className="booking-filters">
      {/* Search */}
      <input
        type="text"
        placeholder="Search patient..."
        value={filters.search}
        onChange={(e) => onChange("search", e.target.value)}
      />

      {/* Status */}
      <select
        value={filters.status}
        onChange={(e) => onChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
      </select>

      {/* Payment */}
      <select
        value={filters.payment}
        onChange={(e) => onChange("payment", e.target.value)}
      >
        <option value="">All Payments</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid / Pending</option>
      </select>

      {/* Date Filter */}
      <select
        value={filters.date}
        onChange={(e) => onChange("date", e.target.value)}
      >
        <option value="">All Dates</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7">Last 7 Days</option>
        <option value="lastMonth">Last Month</option>
        <option value="custom">Custom Range</option>
      </select>

      {/* Custom Date Range */}
      {filters.date === "custom" && (
        <div className="date-range">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
          />
        </div>
      )}

      {/* Booking Type */}
      <select
        value={filters.booktype}
        onChange={(e) => onChange("booktype", e.target.value)}
      >
        <option value="">All Types</option>
        <option value="individual">Individual</option>
        <option value="group">Group</option>
      </select>

      {/* Location */}
      <select
        value={filters.location}
        onChange={(e) => onChange("location", e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="At home">At Home</option>
        <option value="Clinic">Clinic</option>
      </select>
    </div>
  );
};

export default BookingFilters;
