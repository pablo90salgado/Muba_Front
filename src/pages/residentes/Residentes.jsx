import { Link } from "react-router-dom";

const residentes = [
	{ nombre: "García, Juan", cama: "101-A", financiador: "OSDE 210" },
	{ nombre: "Martínez, Rosa", cama: "102-A", financiador: "PAMI" },
	{ nombre: "López, Carlos", cama: "102-B", financiador: "Swiss Medical" },
	{ nombre: "Rodríguez, Luis", cama: "104-A", financiador: "PAMI" },
];

export default function ResidentesPage() {
	return (
		<div className="p-2">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Residentes</h1>
					<p className="mt-1 text-sm text-slate-400">Vista principal de residentes activos.</p>
				</div>
				<Link
					to="/residentes/nuevo"
					className="rounded-md bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-900"
				>
					+ Alta residente
				</Link>
			</div>

			<div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#132336]">
				<table className="w-full text-left text-sm">
					<thead className="bg-black/20 text-slate-300">
						<tr>
							<th className="px-4 py-3">Residente</th>
							<th className="px-4 py-3">Cama</th>
							<th className="px-4 py-3">Financiador</th>
						</tr>
					</thead>
					<tbody>
						{residentes.map((item) => (
							<tr key={item.nombre} className="border-t border-white/10">
								<td className="px-4 py-3">{item.nombre}</td>
								<td className="px-4 py-3 text-emerald-300">{item.cama}</td>
								<td className="px-4 py-3 text-slate-300">{item.financiador}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
