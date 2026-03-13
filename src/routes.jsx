// filepath: src/routes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AltaResidente from "./pages/residentes/AltaResidente";
import DashboardCamasPage from "./pages/dashboardCamas";
import FinanciadoresPage from "./pages/financiadores";
import LoginPage from "./pages/login";
import ResidentesPage from "./pages/residentes/Residentes";
import { getAuthSession } from "./utils/auth";

function RequireAuth({ children }) {
  const session = getAuthSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardCamasPage />
            </RequireAuth>
          }
        />
        <Route path="/dashboard-camas" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/financiadores"
          element={
            <RequireAuth>
              <FinanciadoresPage />
            </RequireAuth>
          }
        />
        <Route
          path="/residentes"
          element={
            <RequireAuth>
              <ResidentesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/residentes/nuevo"
          element={
            <RequireAuth>
              <AltaResidente />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}