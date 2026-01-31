import React from "react";
import ServiceRow from "./ServiceRow";
import "./ServicesTable.scss";

export default function ServicesTable({
  services = [],
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
}) {
  return (
    <div className="services-table-wrapper">
      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Price (KES)</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.length === 0 ? (
            <tr>
              <td colSpan="8" className="empty-state">
                No services found.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <ServiceRow
                key={service._id || service.id} // make sure key uses _id
                service={service}
                onView={() => onView(service)}
                onEdit={() => onEdit(service)}
                onDelete={() => onDelete(service)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
