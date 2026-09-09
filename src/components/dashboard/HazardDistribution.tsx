import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { hazardDistribution } from "../../data/mockData";

export default function HazardDistribution() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-900">
          Hazard Distribution
        </h2>

        <p className="text-sm text-slate-500">
          Hazard exposure in selected region
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hazardDistribution}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}