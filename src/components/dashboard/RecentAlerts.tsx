import { Bell, Clock } from "lucide-react";
import { recentAlerts } from "../../data/mockData";
import StatusBadge from "../common/StatusBadge";

export default function RecentAlerts() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />

          <h2 className="font-semibold text-slate-900">
            Recent Alerts
          </h2>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {recentAlerts.map((alert) => (
          <div key={alert.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium text-slate-900">
                  {alert.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {alert.location}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={13} />
                  {alert.time}
                </div>
              </div>

              <StatusBadge status={alert.severity} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}