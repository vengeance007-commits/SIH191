import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import HazardMap from "./pages/HazardMap";
import Habitations from "./pages/Habitations";
import RelocationSites from "./pages/RelocationSites";
import RelocationPlan from "./pages/RelocationPlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* Member 1 */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* Member 2 */}
          <Route path="/hazard-map" element={<HazardMap />} />
          <Route path="/habitations" element={<Habitations />} />
          <Route path="/relocation-sites" element={<RelocationSites />} />
          <Route path="/relocation-plan" element={<RelocationPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;