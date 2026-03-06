// filepath: src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PisoPage from "./pages/PisoPage";
import HealtPage from "./pages/Healt";
import AltaResidente from "./pages/residentes/AltaResidente";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/residentes/nuevo" element={<AltaResidente />} />
        <Route path="/piso/:id" element={<PisoPage />} />
        <Route path="/healt" element={<HealtPage />} />
      </Routes>
    </BrowserRouter>
  );
}