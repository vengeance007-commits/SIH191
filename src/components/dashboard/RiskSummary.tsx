import { AlertTriangle } from "lucide-react";
import { habitations } from "../../data/mockData";
import StatusBadge from "../common/StatusBadge";

export default function RiskSummary() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="font-semibold text-slate-900">
            High-Risk Habitations
          </h2>

          <p className="text-sm text-slate-500">
            Priority locations requiring attention
          </p>
        </div>

        <AlertTriangle className="text-red-500" size={22} />
      </div>

      <div className="divide-y divide-slate-100">
        {habitations.map((habitation) => (
          <div
            key={habitation.id}
            className="flex items-center justify-between p-4"
          >
            <div>
              <p className="font-medium text-slate-900">
                {habitation.name}
              </p>

              <p className="text-sm text-slate-500">
                {habitation.primaryHazard} · Population{" "}
                {habitation.population}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900">
                {habitation.riskScore}/100
              </p>

              <StatusBadge status={habitation.riskLevel} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}