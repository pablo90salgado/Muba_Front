import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex bg-[#101828] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A2236] flex flex-col py-6 px-4">
        <div className="mb-8">
          <span className="text-2xl font-bold tracking-widest">MUBA</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center px-3 py-2 bg-[#1E293B] rounded text-green-400 font-semibold">
                Dashboard de Camas
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Residentes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Financiadores
              </a>
            </li>
            <li className="mt-6 text-xs text-gray-400">FINANZAS</li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Pagos <span className="ml-2 text-xs bg-yellow-600 px-2 rounded">demo</span>
              </a>
            </li>
            <li>
              <Link to="/healt" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Healt <span className="ml-2 text-xs bg-yellow-600 px-2 rounded">demo</span>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Cobranzas <span className="ml-2 text-xs bg-yellow-600 px-2 rounded">demo</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Facturación <span className="ml-2 text-xs bg-yellow-600 px-2 rounded">demo</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Reportes <span className="ml-2 text-xs bg-yellow-600 px-2 rounded">demo</span>
              </a>
            </li>
            <li className="mt-6 text-xs text-gray-400">SISTEMA</li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Configuración
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center px-3 py-2 hover:bg-[#232e47] rounded">
                Usuarios
              </a>
            </li>
          </ul>
        </nav>
        <button className="mt-8 px-3 py-2 bg-[#232e47] rounded text-left text-gray-400 hover:text-white">
          Cerrar sesión
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#1A2236] border-b border-[#232e47]">
          <div>
            <span className="text-lg font-semibold">Institución: Geriátrico San Martín <span className="ml-2 bg-gray-700 text-xs px-2 py-1 rounded">Demo</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-green-600 px-4 py-2 rounded text-white font-semibold hover:bg-green-700">+ Asignar cama</button>
            <div className="bg-[#232e47] px-3 py-2 rounded flex items-center gap-2">
              <span className="bg-green-700 px-2 py-1 rounded text-xs">MG</span>
              <span>M. González</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>
        </header>

        {/* KPIs */}
        <section className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#232e47] rounded p-6 flex flex-col items-center">
            <span className="text-3xl font-bold">20</span>
            <span className="text-gray-400 mt-2">Total camas</span>
            <span className="text-xs text-gray-500 mt-1">1 edificio - 2 pisos</span>
          </div>
          <div className="bg-[#232e47] rounded p-6 flex flex-col items-center">
            <span className="text-3xl font-bold">12</span>
            <span className="text-gray-400 mt-2">Ocupadas</span>
            <span className="text-xs text-gray-500 mt-1">60% de ocupación</span>
          </div>
          <div className="bg-[#232e47] rounded p-6 flex flex-col items-center">
            <span className="text-3xl font-bold">4</span>
            <span className="text-gray-400 mt-2">Disponibles</span>
            <span className="text-xs text-gray-500 mt-1">2 en limpieza - 1 mant.</span>
          </div>
          <div className="bg-[#232e47] rounded p-6 flex flex-col items-center">
            <span className="text-gray-400">Actualización</span>
            <span className="text-lg font-semibold mt-2">hace 18s</span>
            <span className="text-xs text-gray-500 mt-1">Polling cada 30 seg</span>
          </div>
        </section>

        {/* Área de contenido principal */}
        <section className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <span>Mapa visual de camas — ver wireframe "Dashboard de Camas"</span>
          </div>
        </section>
      </main>
    </div>
  );
}