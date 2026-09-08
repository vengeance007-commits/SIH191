import {
  BarChart3,
  FileText,
  Home,
  Map,
  Settings,
  Shield,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/", icon: Home },
  { label: "Hazard Map", path: "/", icon: Map },
  { label: "Habitations", path: "/", icon: Users },
  { label: "Relocation Sites", path: "/", icon: Shield },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
  { label: "Reports", path: "/", icon: FileText },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 flex-col bg-slate-950 text-white lg:flex">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Shield size={22} />
          </div>

          <div>
            <h1 className="font-bold">Sentinel Bharat</h1>

            <p className="text-xs text-slate-400">
              Disaster Decision Support
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4 text-xs text-slate-400">
        State Disaster Management Authority
      </div>
    </aside>
  );
}