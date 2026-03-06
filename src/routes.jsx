// filepath: src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PisoPage from "./pages/PisoPage";
import HealtPage from "./pages/Healt";
import AltaResidente from "./pages/residentes/AltaResidente";
import DashboardCamasPage from "./pages/dashboardCamas";
import FinanciadoresPage from "./pages/financiadores";
import ResidentesPage from "./pages/residentes/Residentes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardCamasPage />} />
        <Route path="/dashboard-camas" element={<DashboardCamasPage />} />
        <Route path="/financiadores" element={<FinanciadoresPage />} />
        <Route path="/residentes" element={<ResidentesPage />} />
        <Route path="/residentes/nuevo" element={<AltaResidente />} />
        <Route path="/piso/:id" element={<PisoPage />} />
        <Route path="/healt" element={<HealtPage />} />
      </Routes>
    </BrowserRouter>
  );
}