import { Outlet } from "react-router-dom";

import AppSidebar from "../components/sidebar/AppSidebar";
import TopNavbar from "../components/navbar/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <AppSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <TopNavbar />

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}