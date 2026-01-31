// src/layout/admin/AdminLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.scss";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main content */}
      <div className="admin-main">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-content">
          {/* Nested pages will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
