import AppLayout from "../../components/AppLayout";

const kpis = [
  { label: "Total camas", value: "20", sub: "1 edificio · 2 pisos", color: "text-[#F0F6FF]", top: "bg-[#5A7A96]" },
  { label: "Ocupadas", value: "12", sub: "60% de ocupación", color: "text-[#00C896]", top: "bg-[#00C896]" },
  { label: "Disponibles", value: "4", sub: "2 en limpieza · 1 mant.", color: "text-[#8AADCC]", top: "bg-[#8AADCC]" },
  { label: "Actualización", value: "hace 18s", sub: "Polling cada 30 seg", color: "text-[#F0F6FF]", top: "bg-[#A78BFA]" },
];

const roomBlocks = [
  { room: "Hab. 101", type: "Individual", beds: [{ id: "101-A", status: "ocupada", resident: "García, Juan" }] },
  {
    room: "Hab. 102",
    type: "Doble",
    beds: [
      { id: "102-A", status: "ocupada", resident: "Martínez, Rosa" },
      { id: "102-B", status: "ocupada", resident: "López, Carlos" },
    ],
  },
  {
    room: "Hab. 103",
    type: "Triple",
    beds: [
      { id: "103-A", status: "ocupada", resident: "Fernández, Ana" },
      { id: "103-B", status: "limpieza" },
      { id: "103-C", status: "disponible" },
    ],
  },
];


const bedColors = {
  ocupada: "bg-[#00C896]/12 border-[#00C896]/35 text-[#00C896]",
  disponible: "bg-[#8AADCC]/10 border-[#8AADCC]/35 text-[#8AADCC]",
  limpieza: "bg-[#F0A500]/12 border-[#F0A500]/35 text-[#F0A500]",
};

const occupancyLegend = [
  { label: "Ocupadas", count: 12, pct: "60%", color: "#00C896" },
  { label: "Disponibles", count: 4, pct: "20%", color: "#8AADCC" },
  { label: "En limpieza", count: 2, pct: "10%", color: "#F0A500" },
  { label: "Mantenimiento", count: 1, pct: "5%", color: "#FF5A5A" },
  { label: "Reservadas", count: 1, pct: "5%", color: "#A78BFA" },
];

export default function DashboardCamasPage() {
  return (
    <AppLayout activeModule="dashboard" title="Dashboard de Camas" actionLabel="＋ Asignar cama">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#132336] p-4">
              <div className={`absolute inset-x-0 top-0 h-[2px] ${kpi.top}`} />
              <p className="text-xs text-[#5A7A96]">{kpi.label}</p>
              <p className={`mt-2 text-3xl font-extrabold ${kpi.color}`}>{kpi.value}</p>
              <p className="mt-1 text-xs text-[#5A7A96]">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#132336] p-3">
          <span className="text-xs text-[#5A7A96]">Edificio:</span>
          <button className="rounded-md border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-1 text-xs text-[#00C896]">Edificio Principal</button>
          <span className="mx-1 h-5 w-px bg-white/10" />
          <span className="text-xs text-[#5A7A96]">Estado:</span>
          <button className="rounded-md border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-1 text-xs text-[#00C896]">Todos</button>
          <button className="rounded-md border border-white/10 bg-[#1A2F45] px-3 py-1 text-xs text-[#8AADCC]">Ocupadas</button>
          <button className="rounded-md border border-white/10 bg-[#1A2F45] px-3 py-1 text-xs text-[#8AADCC]">Disponibles</button>
          <span className="ml-auto text-xs font-mono text-[#5A7A96]">⟳ hace 12s · próx. en 18s</span>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_220px]">
          <div className="rounded-xl border border-white/10 bg-[#132336]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Piso 1</p>
                <p className="text-xs text-[#5A7A96]">4 habitaciones · 10 camas · 6 ocupadas</p>
              </div>
              <span className="text-xs font-mono text-[#5A7A96]">Actualizado hace 12s</span>
            </div>

            <div className="space-y-5 p-4">
              {roomBlocks.map((room) => (
                <div key={room.room}>
                  <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-[#5A7A96]">
                    <span>{room.room}</span>
                    <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px]">{room.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {room.beds.map((bed) => (
                      <div key={bed.id} className={`w-[116px] rounded-lg border p-2 ${bedColors[bed.status]}`}>
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span>{bed.id}</span>
                          <span>{bed.status === "ocupada" ? "🟢" : bed.status === "limpieza" ? "🟡" : "⚪"}</span>
                        </div>
                        <div className="mt-2 min-h-[40px] text-[11px] text-[#F0F6FF]">
                          {bed.resident ? bed.resident : <span className="text-[#5A7A96]">{bed.status === "limpieza" ? "En limpieza" : "Disponible"}</span>}
                        </div>
                        <div className="mt-2 h-[3px] rounded bg-current/90" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/10 bg-[#132336] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8AADCC]">📊 Ocupación general</p>

              <div className="mt-2 flex items-center justify-center">
                <div className="relative flex h-[120px] w-[120px] items-center justify-center">
                  <svg width="110" height="110" viewBox="0 0 110 110" className="drop-shadow-[0_0_10px_rgba(0,200,150,0.22)]">
                    <circle cx="55" cy="55" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
                    <circle cx="55" cy="55" r="42" fill="none" stroke="#00C896" strokeWidth="12" strokeDasharray="158.3 105.6" strokeDashoffset="66" strokeLinecap="round" />
                    <circle cx="55" cy="55" r="42" fill="none" stroke="#8AADCC" strokeWidth="12" strokeDasharray="52.8 210.1" strokeDashoffset="-92.3" strokeLinecap="round" />
                    <circle cx="55" cy="55" r="42" fill="none" stroke="#F0A500" strokeWidth="12" strokeDasharray="26.4 237" strokeDashoffset="-145.1" strokeLinecap="round" />
                    <circle cx="55" cy="55" r="42" fill="none" stroke="#FF5A5A" strokeWidth="12" strokeDasharray="13.2 250.3" strokeDashoffset="-171.5" strokeLinecap="round" />
                    <circle cx="55" cy="55" r="42" fill="none" stroke="#A78BFA" strokeWidth="12" strokeDasharray="13.2 250.3" strokeDashoffset="-184.7" strokeLinecap="round" />
                  </svg>

                  <div className="absolute text-center">
                    <p className="text-2xl font-extrabold leading-none text-[#00C896]">60%</p>
                    <p className="mt-0.5 text-[10px] text-[#5A7A96]">ocupación</p>
                  </div>
                </div>
              </div>

              <div className="mt-1 space-y-1.5">
                {occupancyLegend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: item.color }} />
                    <span className="flex-1 text-[#8AADCC]">{item.label}</span>
                    <span className="font-mono text-sm font-semibold text-[#F0F6FF]">{item.count}</span>
                    <span className="font-mono text-[10px] text-[#5A7A96]">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#132336] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8AADCC]">🔔 Novedades del día</p>
              <div className="mt-2 space-y-2 text-xs text-[#8AADCC]">
                <p>• Cama 103-B liberada (09:45)</p>
                <p>• Reingreso en cama 205-A</p>
                <p>• Cama 104-B en mantenimiento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
