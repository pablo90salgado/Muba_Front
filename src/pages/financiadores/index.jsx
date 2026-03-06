import AppLayout from "../../components/AppLayout";

const financiadores = [
  { nombre: "PAMI", plan: "Cobertura integral", residentes: 12 },
  { nombre: "OSDE", plan: "Plan 210", residentes: 7 },
  { nombre: "Swiss Medical", plan: "SMG20", residentes: 4 },
  { nombre: "Particular", plan: "Pago directo", residentes: 3 },
];

export default function FinanciadoresPage() {
  return (
    <AppLayout activeModule="financiadores" title="Financiadores" actionLabel="＋ Nuevo financiador">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#132336]">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20 text-slate-300">
              <tr>
                <th className="px-4 py-3">Financiador</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Residentes</th>
              </tr>
            </thead>
            <tbody>
              {financiadores.map((item) => (
                <tr key={item.nombre} className="border-t border-white/10">
                  <td className="px-4 py-3">{item.nombre}</td>
                  <td className="px-4 py-3 text-slate-300">{item.plan}</td>
                  <td className="px-4 py-3 text-emerald-300">{item.residentes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
