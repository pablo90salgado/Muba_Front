import AppLayout from "../../components/AppLayout";

const kpis = [
  { label: "Total camas", value: "20", sub: "1 edificio · 2 pisos", color: "text-[#F0F6FF]" },
  { label: "Ocupadas", value: "12", sub: "60% de ocupación", color: "text-[#00C896]" },
  { label: "Disponibles", value: "4", sub: "Listas para asignar", color: "text-[#8AADCC]" },
  { label: "En limpieza", value: "2", sub: "Liberadas hoy", color: "text-[#F0A500]" },
];

export default function DashboardCamasPage() {
  return (
    <AppLayout activeModule="dashboard" title="Dashboard de Camas" actionLabel="＋ Asignar cama">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-white/10 bg-[#132336] p-4">
              <p className="text-xs text-[#5A7A96]">{kpi.label}</p>
              <p className={`mt-2 text-3xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-[#5A7A96]">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#132336] p-4">
          <p className="text-sm font-semibold text-[#F0F6FF]">Mapa de camas</p>
          <p className="mt-1 text-xs text-[#5A7A96]">Módulo principal de camas migrado a React + Tailwind.</p>
        </div>
      </div>
    </AppLayout>
  );
}
