import "./ServiceRow.scss";
import ServiceActions from "./ServiceActions";

export default function ServiceRow({ service, onView, onEdit, onDelete }) {
  return (
    <tr>
      <td>{service.id}</td>
      <td>{service.name}</td>
      <td>{service.type}</td>
      <td>{service.category}</td>
      <td>{service.price}</td>
      <td>{service.duration}</td>
      <td>{service.status}</td>

      <td>
        <ServiceActions
          service={service}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
