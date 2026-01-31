import "./Topbar.scss";
import { Menu, Bell, UserCircle } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button onClick={onMenuClick} className="menu-btn">
          <Menu />
        </button>
        <h1 className="topbar-title">iDrip Plus Admin</h1>
      </div>

      <div className="topbar-right">
        <Bell className="topbar-icon" />
        <UserCircle className="topbar-icon" />
      </div>
    </header>
  );
}
