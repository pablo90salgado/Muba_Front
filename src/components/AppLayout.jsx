import { Link } from "react-router-dom";

function SidebarItem({ to, icon, label, active, badge, demo }) {
  const baseClasses = "relative flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left text-[12.5px] transition";
  const stateClasses = active
    ? "border-[#00C896]/20 bg-[#00C896]/10 text-[#00C896]"
    : demo
    ? "border-transparent bg-transparent text-[#F0A500]/50"
    : "border-transparent bg-transparent text-[#8AADCC] hover:bg-[#1E3550]";

  if (demo) {
    return (
      <div className={`${baseClasses} ${stateClasses}`}>
        <span className="w-4 text-center text-sm">{icon}</span>
        <span className="flex-1">{label}</span>
        <span className="rounded-full border border-[#F0A500]/25 bg-[#F0A500]/10 px-1.5 py-[1px] text-[9px] font-semibold text-[#F0A500]">
          demo
        </span>
      </div>
    );
  }

  return (
    <Link to={to} className={`${baseClasses} ${stateClasses}`}>
      <span className="w-4 text-center text-sm">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-full border border-[#FF5A5A]/25 bg-[#FF5A5A]/10 px-1.5 py-[1px] text-[9px] font-semibold text-[#FF5A5A]">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

const MODULE_URLS = {
  dashboard: "app.muba.com.ar / camas",
  residentes: "app.muba.com.ar / residentes",
  financiadores: "app.muba.com.ar / financiadores",
};

export default function AppLayout({ activeModule, title, actionLabel, children }) {
  const fakeUrl = MODULE_URLS[activeModule] || MODULE_URLS.dashboard;

  return (
    <div className="min-h-screen bg-[#090F18] p-4 text-[#F0F6FF]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C896] bg-[#1A2F45] text-sm">⬢</div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xs text-[#5A7A96]">MUBA · Sistema de Gestión para Instituciones de Salud · MVP v2.0</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="rounded-full border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-1 text-[#00C896]">Fase 1</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[#8AADCC]">Wireframe · Marzo 2026</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#00C896]/15 bg-[#0D1B2A] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#070E18] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-auto w-full max-w-[420px] rounded-md border border-white/10 bg-[#132336] px-3 py-1 text-center font-mono text-[11px] text-[#5A7A96]">
            {fakeUrl}
          </div>
        </div>

        <div className="flex h-[54px] items-center gap-3 border-b border-white/10 bg-[#132336] px-5">
          <div className="flex items-center gap-2 border-r border-white/10 pr-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#00C896]/25 bg-[#00C896]/10 text-xs">⬢</div>
            <span className="font-sans text-[15px] font-extrabold">MUBA</span>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <span className="text-[13px] font-medium">Geriátrico San Martín</span>
            <span className="rounded-full border border-[#00C896]/25 bg-[#00C896]/10 px-2 py-0.5 text-[10px] text-[#00C896]">Demo</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">🔍</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">🔔</button>
            <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#1A2F45] px-2 py-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#00C896]/25 bg-[#00C896]/10 text-[10px] font-bold text-[#00C896]">MG</span>
              <div>
                <p className="text-xs font-medium">M. González</p>
                <p className="text-[10px] text-[#5A7A96]">Admin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[720px]">
          <aside className="w-[220px] shrink-0 border-r border-white/10 bg-[#132336] p-2.5">
            <div className="mb-2 px-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A7A96]">Principal</div>
            <div className="space-y-0.5">
              <SidebarItem to="/dashboard" icon="🛏" label="Dashboard de Camas" active={activeModule === "dashboard"} />
              <SidebarItem to="/residentes" icon="🧓" label="Residentes" active={activeModule === "residentes"} />
              <SidebarItem to="/financiadores" icon="🏥" label="Financiadores" badge="2" active={activeModule === "financiadores"} />
            </div>

            <div className="my-2 h-px bg-white/10" />

            <div className="mb-2 px-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A7A96]">Finanzas</div>
            <div className="space-y-0.5">
              <SidebarItem icon="💳" label="Pagos" demo />
              <SidebarItem icon="📊" label="Cobranzas" demo />
              <SidebarItem icon="🧾" label="Facturación" demo />
              <SidebarItem icon="📈" label="Reportes" demo />
            </div>

            <div className="my-2 h-px bg-white/10" />

            <div className="mb-2 px-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A7A96]">Sistema</div>
            <div className="space-y-0.5">
              <SidebarItem to="#" icon="⚙️" label="Configuración" />
              <SidebarItem to="#" icon="👥" label="Usuarios" />
            </div>
          </aside>

          <main className="flex flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-white/10 bg-[#132336] px-5 py-2.5">
              <div className="text-xs text-[#5A7A96]">
                Inicio <span className="opacity-40">/</span> <span className="font-medium text-[#F0F6FF]">{title}</span>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-white/10 bg-transparent px-3 py-1.5 text-xs text-[#8AADCC]">⬇ Exportar</button>
                <button className="rounded-lg bg-[#00C896] px-3 py-1.5 text-xs font-semibold text-[#0D1B2A]">{actionLabel}</button>
              </div>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}