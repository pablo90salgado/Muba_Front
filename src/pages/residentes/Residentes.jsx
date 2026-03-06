import { Link } from "react-router-dom";
import AppLayout from "../../components/AppLayout";

const residentes = [
	{ iniciales: "JG", nombre: "García, Juan Carlos", dni: "28.441.902", cama: "101-A · Hab. 101", financiador: "OSDE Plan 210", estado: "Activo", completitud: 100, tone: "teal" },
	{ iniciales: "RM", nombre: "Martínez, Rosa Elena", dni: "18.334.201", cama: "102-A · Hab. 102", financiador: "PAMI Estándar", estado: "Activo", completitud: 70, tone: "purple" },
	{ iniciales: "LC", nombre: "López, Carlos Alberto", dni: "22.890.445", cama: "102-B · Hab. 102", financiador: "Swiss Medical", estado: "Activo", completitud: 40, tone: "blue" },
	{ iniciales: "FA", nombre: "Fernández, Ana María", dni: "25.112.887", cama: "103-A · Hab. 103", financiador: "OSDE Plan 210", estado: "Activo", completitud: 85, tone: "green" },
	{ iniciales: "PM", nombre: "Pérez, Mirta Noemí", dni: "14.778.330", cama: "— (ausente)", financiador: "PAMI Estándar", estado: "Ausente", completitud: 100, tone: "orange" },
	{ iniciales: "SR", nombre: "Sánchez, Roberto", dni: "20.556.119", cama: "— (egresado)", financiador: "Swiss Medical", estado: "Egresado", completitud: 90, tone: "muted", faded: true },
];

const avatarTone = {
	teal: "from-[#1A3A5C] to-[#0D2840] text-[#00C896]",
	purple: "from-[#2A1A3C] to-[#1A0D30] text-[#A78BFA]",
	blue: "from-[#1A2C3A] to-[#0D1E2A] text-[#8AADCC]",
	green: "from-[#1A3A2A] to-[#0D2A1A] text-[#00C896]",
	orange: "from-[#3A2A1A] to-[#2A1A0D] text-[#F0A500]",
	muted: "from-[#1A2F45] to-[#132336] text-[#5A7A96]",
};

const statusTone = {
	Activo: "bg-[#00C896]/10 text-[#00C896] border-[#00C896]/20",
	Ausente: "bg-[#F0A500]/10 text-[#F0A500] border-[#F0A500]/20",
	Egresado: "bg-[#8AADCC]/10 text-[#8AADCC] border-[#8AADCC]/20",
};

export default function ResidentesPage() {
	return (
		<AppLayout activeModule="residentes" title="Residentes" actionLabel="＋ Alta residente">
			<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
				<div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-[#132336] p-3">
					<div className="flex min-w-[250px] flex-1 items-center gap-2 rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">
						<span>🔍</span>
						<span>García</span>
						<span className="inline-block h-3.5 w-px animate-pulse bg-[#00C896]" />
					</div>
					<button className="rounded-lg border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-2 text-xs text-[#00C896]">Estado: Activos ▾</button>
					<button className="rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">Obra Social ▾</button>
					<button className="rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">Habitación ▾</button>
					<button className="rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-xs text-[#8AADCC]">Completitud ▾</button>
					<span className="ml-auto text-xs text-[#5A7A96]"><strong className="text-[#F0F6FF]">15</strong> residentes · mostrando 10</span>
				</div>

				<div className="flex items-center justify-end">
					<Link to="/residentes/nuevo" className="rounded-md bg-[#00C896] px-4 py-2 text-sm font-semibold text-[#0D1B2A]">
						＋ Nuevo residente
					</Link>
				</div>

				<div className="overflow-hidden rounded-xl border border-white/10 bg-[#132336]">
					<div className="grid grid-cols-[2.5fr_1fr_1.2fr_1.2fr_0.9fr_0.8fr_80px] gap-3 border-b border-white/10 bg-black/15 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5A7A96]">
						<span className="text-[#00C896]">Residente ↕</span>
						<span>DNI</span>
						<span>Cama / Hab.</span>
						<span>Obra Social</span>
						<span>Estado</span>
						<span>Completitud</span>
						<span></span>
					</div>

					{residentes.map((item, index) => (
						<div
							key={item.dni}
							className={`grid grid-cols-[2.5fr_1fr_1.2fr_1.2fr_0.9fr_0.8fr_80px] gap-3 border-b border-white/10 px-4 py-3 text-sm ${
								index === 0 ? "border-l-2 border-l-[#00C896] bg-[#00C896]/10" : "hover:bg-[#1E3550]"
							} ${item.faded ? "opacity-60" : ""}`}
						>
							<div className="flex items-center gap-2.5">
								<span className={`flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-gradient-to-br text-[13px] font-bold ${avatarTone[item.tone]}`}>
									{item.iniciales}
								</span>
								<div>
									<p className="text-[13px] font-medium text-[#F0F6FF]">{item.nombre}</p>
									<p className="font-mono text-[11px] text-[#5A7A96]">{item.dni}</p>
								</div>
							</div>
							<div className="font-mono text-xs text-[#8AADCC]">{item.dni}</div>
							<div className="text-xs text-[#F0F6FF]">{item.cama}</div>
							<div className="text-xs text-[#8AADCC]">{item.financiador}</div>
							<div>
								<span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${statusTone[item.estado]}`}>
									<span className="h-1.5 w-1.5 rounded-full bg-current" />
									{item.estado}
								</span>
							</div>
							<div className="flex items-center gap-1.5">
								<span className="h-1 w-[60px] overflow-hidden rounded bg-[#1A2F45]">
									<span
										className="block h-full rounded"
										style={{
											width: `${item.completitud}%`,
											backgroundColor: item.completitud >= 80 ? "#00C896" : item.completitud >= 50 ? "#F0A500" : "#FF5A5A",
										}}
									/>
								</span>
								<span className="font-mono text-[10px] text-[#8AADCC]">{item.completitud}%</span>
							</div>
							<div className="flex items-center justify-end gap-1">
								<button className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">👁</button>
								{!item.faded && <button className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">✏</button>}
							</div>
						</div>
					))}

					<div className="flex items-center justify-between px-4 py-3">
						<span className="text-xs text-[#5A7A96]">Mostrando 1–6 de 15 residentes</span>
						<div className="flex gap-1">
							<button className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">‹</button>
							<button className="flex h-7 w-7 items-center justify-center rounded-md border border-[#00C896]/25 bg-[#00C896]/10 text-xs text-[#00C896]">1</button>
							<button className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">2</button>
							<button className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-xs text-[#8AADCC]">›</button>
						</div>
					</div>
				</div>
			</div>
		</AppLayout>
	);
}
