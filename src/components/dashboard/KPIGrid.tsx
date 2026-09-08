import {
  AlertTriangle,
  Building2,
  MapPin,
  Users,
} from "lucide-react";

import KPICard from "./KPICard";

export default function KPIGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KPICard
        title="Habitations Analysed"
        value="1,248"
        subtitle="Across selected region"
        icon={Building2}
        iconClass="bg-blue-50 text-blue-600"
      />

      <KPICard
        title="High-Risk Habitations"
        value="187"
        subtitle="Require attention"
        icon={AlertTriangle}
        iconClass="bg-red-50 text-red-600"
      />

      <KPICard
        title="Immediate Relocation"
        value="43"
        subtitle="Require urgent action"
        icon={Users}
        iconClass="bg-orange-50 text-orange-600"
      />

      <KPICard
        title="Suitable Sites"
        value="76"
        subtitle="Potential relocation sites"
        icon={MapPin}
        iconClass="bg-green-50 text-green-600"
      />
    </div>
  );
}