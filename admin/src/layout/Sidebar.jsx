import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
  { name: "Services", path: "/admin/services", icon: Package },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "" : "closed"}`}>
      <div className="sidebar-header">iDrip Plus</div>

      <nav className="sidebar-nav">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
