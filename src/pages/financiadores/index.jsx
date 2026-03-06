import AppLayout from "../../components/AppLayout";

const financiadores = [
  {
    nombre: "OSDE",
    tipo: "Prepaga · Empresa privada",
    residentes: 3,
    planes: 2,
    convenios: 2,
    estado: "Activo",
    badge: "31 Dic 2026",
    badgeTone: "ok",
    topTone: "bg-[#00C896]",
    selected: true,
    icon: "🏥",
  },
  {
    nombre: "PAMI",
    tipo: "Obra Social · Estado nacional",
    residentes: 5,
    planes: 1,
    convenios: 1,
    estado: "Activo",
    badge: "Venció 31 Ene 2026",
    badgeTone: "danger",
    topTone: "bg-[#FF5A5A]",
    icon: "🏛",
  },
  {
    nombre: "Swiss Medical",
    tipo: "Prepaga · Empresa privada",
    residentes: 2,
    planes: 2,
    convenios: 2,
    estado: "Activo",
    badge: "En 8 días",
    badgeTone: "warn",
    topTone: "bg-[#F0A500]",
    icon: "💊",
  },
  { nombre: "Particular", plan: "Pago directo", residentes: 3 },
];

const badgeToneClasses = {
  ok: "border-[#00C896]/25 bg-[#00C896]/10 text-[#00C896]",
  warn: "border-[#F0A500]/25 bg-[#F0A500]/10 text-[#F0A500]",
  danger: "border-[#FF5A5A]/25 bg-[#FF5A5A]/10 text-[#FF5A5A]",
};

export default function FinanciadoresPage() {
  return (
    <AppLayout activeModule="financiadores" title="Financiadores" actionLabel="＋ Nuevo financiador">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="flex items-center gap-3 rounded-xl border border-[#FF5A5A]/25 bg-[#FF5A5A]/10 p-3">
          <span className="text-lg">🚨</span>
          <p className="flex-1 text-sm text-[#8AADCC]">
            <strong className="text-[#FF5A5A]">1 convenio vencido</strong> — PAMI Estándar venció el 31 Ene 2026.
          </p>
          <button className="rounded-md border border-[#FF5A5A]/25 bg-[#FF5A5A]/10 px-3 py-1.5 text-xs font-semibold text-[#FF5A5A]">Ver convenio →</button>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-[#F0A500]/25 bg-[#F0A500]/10 p-3">
          <span className="text-lg">⚠</span>
          <p className="flex-1 text-sm text-[#8AADCC]">
            <strong className="text-[#F0A500]">1 convenio vence en 8 días</strong> — Swiss Medical Plan Corporativo vence el 7 Mar 2026.
          </p>
          <button className="rounded-md border border-[#F0A500]/25 bg-[#F0A500]/10 px-3 py-1.5 text-xs font-semibold text-[#F0A500]">Ver convenio →</button>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#132336] p-3">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#5A7A96]">
            <span>🔍</span>
            <span>Buscar financiador...</span>
          </div>
          <button className="rounded-lg border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-2 text-xs text-[#00C896]">Todos (3)</button>
          <button className="rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">Obras Sociales</button>
          <button className="rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">Prepagas</button>
          <button className="rounded-lg border border-[#F0A500]/25 bg-[#F0A500]/10 px-3 py-2 text-xs text-[#F0A500]">⚠ Con alertas (2)</button>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {financiadores.slice(0, 3).map((item) => (
            <div
              key={item.nombre}
              className={`overflow-hidden rounded-xl border bg-[#132336] ${
                item.selected ? "border-[#00C896]/25 shadow-[0_0_0_1px_rgba(0,200,150,0.1)]" : "border-white/10"
              }`}
            >
              <div className={`h-1 ${item.topTone}`} />
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#1A2F45] text-lg">{item.icon}</span>
                    <div>
                      <p className="font-sans text-sm font-bold text-[#F0F6FF]">{item.nombre}</p>
                      <p className="text-[11px] text-[#5A7A96]">{item.tipo}</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-[#00C896]/20 bg-[#00C896]/10 px-2 py-0.5 text-[10px] text-[#00C896]">Activo</span>
                </div>

                <div className="mb-3 grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[10px] text-[#5A7A96]">Residentes</p>
                    <p className="text-base font-bold text-[#00C896]">{item.residentes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#5A7A96]">Planes</p>
                    <p className="text-base font-bold text-[#F0F6FF]">{item.planes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#5A7A96]">Convenios</p>
                    <p className="text-base font-bold text-[#F0F6FF]">{item.convenios}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                  <span className="text-[11px] text-[#8AADCC]">📋 Próximo venc.</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeToneClasses[item.badgeTone]}`}>{item.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
