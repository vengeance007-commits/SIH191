import KPIGrid from "../components/dashboard/KPIGrid";
import RiskSummary from "../components/dashboard/RiskSummary";
import HazardDistribution from "../components/dashboard/HazardDistribution";
import RelocationPriority from "../components/dashboard/RelocationPriority";
import RecentAlerts from "../components/dashboard/RecentAlerts";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <KPIGrid />

      <div className="grid gap-6 xl:grid-cols-2">
        <RiskSummary />
        <RecentAlerts />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <HazardDistribution />
        <RelocationPriority />
      </div>
    </div>
  );
}