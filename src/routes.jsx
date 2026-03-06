// filepath: src/routes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AltaResidente from "./pages/residentes/AltaResidente";
import DashboardCamasPage from "./pages/dashboardCamas";
import FinanciadoresPage from "./pages/financiadores";
import ResidentesPage from "./pages/residentes/Residentes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardCamasPage />} />
        <Route path="/dashboard-camas" element={<Navigate to="/dashboard" replace />} />
        <Route path="/financiadores" element={<FinanciadoresPage />} />
        <Route path="/residentes" element={<ResidentesPage />} />
        <Route path="/residentes/nuevo" element={<AltaResidente />} />
      </Routes>
    </BrowserRouter>
  );
}