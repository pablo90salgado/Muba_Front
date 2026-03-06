import { Link } from "react-router-dom";

const steps = [
	{
		number: "✓",
		title: "Datos personales",
		description: "Nombre, DNI, fecha de nacimiento, sexo",
		status: "done",
	},
	{
		number: "2",
		title: "Contacto de emergencia",
		description: "Mínimo 1 requerido para completar el alta",
		status: "active",
	},
	{
		number: "3",
		title: "Asignación de cama",
		description: "Selección desde el mapa visual",
		status: "pending",
	},
];

export default function AltaResidente() {
	return (
		<div className="min-h-screen bg-[#090F18] text-[#F0F6FF]">
			<header className="flex h-14 items-center justify-between border-b border-white/10 bg-[#132336] px-6">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 border-r border-white/10 pr-4">
						<div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#00C896]/40 bg-[#00C896]/10 text-xs font-bold text-[#00C896]">
							M
						</div>
						<span className="font-semibold">MUBA</span>
					</div>
					<div className="flex items-center gap-2 text-sm">
						<span>Geriátrico San Martín</span>
						<span className="rounded-full border border-[#00C896]/30 bg-[#00C896]/10 px-2 py-0.5 text-xs text-[#00C896]">
							Demo
						</span>
					</div>
				</div>
				<div className="flex items-center gap-3 text-sm">
					<div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1A2F45] px-2 py-1">
						<span className="rounded bg-[#00C896]/20 px-1.5 py-0.5 text-[10px] text-[#00C896]">MG</span>
						<span>M. González</span>
					</div>
				</div>
			</header>

			<div className="flex min-h-[calc(100vh-56px)]">
				<aside className="w-56 border-r border-white/10 bg-[#132336] px-3 py-5">
					<div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5A7A96]">
						Principal
					</div>
					<nav className="space-y-1">
						<Link className="block rounded-md px-3 py-2 text-sm text-[#8AADCC] hover:bg-white/5" to="/">
							Dashboard
						</Link>
						<div className="rounded-md border border-[#00C896]/20 bg-[#00C896]/10 px-3 py-2 text-sm text-[#00C896]">
							Residentes
						</div>
						<div className="rounded-md px-3 py-2 text-sm text-[#8AADCC]">Financiadores</div>
					</nav>
				</aside>

				<main className="flex-1">
					<div className="flex items-center justify-between border-b border-white/10 bg-[#132336] px-8 py-3 text-sm text-[#5A7A96]">
						<div className="flex items-center gap-2">
							<span>Residentes</span>
							<span>/</span>
							<span className="font-medium text-[#F0F6FF]">Nuevo residente</span>
						</div>
						<span>Paso 2 de 3 · Podés guardar y continuar después</span>
					</div>

					<div className="flex min-h-[calc(100vh-106px)]">
						<section className="w-60 border-r border-white/10 bg-[#132336] p-4">
							<h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5A7A96]">
								Pasos del alta
							</h2>
							<div className="space-y-2">
								{steps.map((step) => {
									const isActive = step.status === "active";
									const isDone = step.status === "done";
									return (
										<div
											key={step.title}
											className={`rounded-lg border px-2.5 py-2 ${
												isActive
													? "border-[#00C896]/25 bg-[#00C896]/10"
													: "border-transparent bg-transparent"
											} ${step.status === "pending" ? "opacity-50" : "opacity-100"}`}
										>
											<div className="flex items-start gap-3">
												<div
													className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
														isDone
															? "border border-[#00C896]/40 bg-[#00C896]/10 text-[#00C896]"
															: isActive
															? "bg-[#00C896] text-[#0D1B2A]"
															: "border border-white/10 bg-[#1A2F45] text-[#5A7A96]"
													}`}
												>
													{step.number}
												</div>
												<div>
													<p
														className={`text-sm ${
															isActive
																? "text-[#00C896]"
																: step.status === "done"
																? "text-[#8AADCC]"
																: "text-[#5A7A96]"
														}`}
													>
														{step.title}
													</p>
													<p className="mt-1 text-xs text-[#5A7A96]">{step.description}</p>
												</div>
											</div>
										</div>
									);
								})}
							</div>

							<div className="mt-6 rounded-lg border border-[#00C896]/30 bg-[#00C896]/10 p-3">
								<p className="text-xs font-semibold text-[#00C896]">Alta simplificada</p>
								<p className="mt-1 text-xs leading-relaxed text-[#8AADCC]">
									Solo campos obligatorios. Info médica, facturación y cobertura se completa desde la ficha después.
								</p>
							</div>
						</section>

						<section className="flex flex-1 flex-col gap-6 p-8">
							<div className="flex items-center gap-3 rounded-lg border border-[#00C896]/20 bg-[#1A2F45] p-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C896]/40 bg-[#00C896]/10 text-sm font-bold text-[#00C896]">
									PE
								</div>
								<div>
									<p className="text-sm font-medium">Pérez, Elena Sofía</p>
									<p className="text-xs text-[#5A7A96]">DNI 35.221.440 · Femenino · 14/06/1955 · 70 años</p>
								</div>
								<button className="ml-auto text-xs text-[#00C896]">Editar</button>
							</div>

							<div>
								<h1 className="text-xl font-semibold">Contacto de emergencia</h1>
								<p className="mt-1 text-sm text-[#5A7A96]">
									Ingresá al menos un contacto. Podés agregar más desde la ficha una vez creado el residente.
								</p>
							</div>

							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
									<Field label="Nombre completo" required className="md:col-span-2" value="Pérez García, Marcos" />
									<Field label="Relación" required value="Hijo" />
								</div>

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<Field label="Teléfono primario" required value="+54 11 1598-2244" active />
									<Field label="Teléfono secundario" placeholder="Opcional" />
								</div>

								<div>
									<Field label="Email de contacto" placeholder="Opcional — para notificaciones futuras" />
									<p className="mt-1 text-xs text-[#5A7A96]">Las notificaciones automáticas se activarán en Fase 2</p>
								</div>

								<button className="w-full rounded-lg border border-dashed border-white/15 px-4 py-3 text-left text-sm text-[#5A7A96] hover:bg-white/5">
									+ Agregar otro contacto
								</button>
							</div>

							<div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
								<span className="text-sm text-[#5A7A96]">Paso 2 de 3</span>
								<div className="flex items-center gap-2">
									<button className="rounded-lg border border-white/10 px-4 py-2 text-sm text-[#8AADCC]">← Volver</button>
									<button className="rounded-lg bg-[#00C896] px-4 py-2 text-sm font-semibold text-[#0D1B2A]">
										Siguiente: Asignar cama →
									</button>
								</div>
							</div>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}

function Field({ label, required = false, value = "", placeholder = "", active = false, className = "" }) {
	return (
		<label className={`block ${className}`}>
			<span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5A7A96]">
				{label}
				{required && <span className="ml-1 text-[#00C896]">·</span>}
			</span>
			<input
				className={`w-full rounded-lg border bg-[#1A2F45] px-3 py-2.5 text-sm text-[#F0F6FF] outline-none placeholder:text-[#5A7A96] ${
					active
						? "border-[#00C896] ring-2 ring-[#00C896]/15"
						: value
						? "border-[#00C896]/30"
						: "border-white/10"
				}`}
				defaultValue={value}
				placeholder={placeholder}
			/>
		</label>
	);
}
