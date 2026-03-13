import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuthSession, setAuthSession } from "../../utils/auth";

const DEMO_USERS = [
  {
    email: "admin@demo.com",
    password: "demo123",
    role: "Administrador",
    destination: "/dashboard",
    accent: "#00C896",
  },
  {
    email: "enfermeria@demo.com",
    password: "demo123",
    role: "Enfermeria",
    destination: "/residentes",
    accent: "#8AADCC",
  },
  {
    email: "finanzas@demo.com",
    password: "demo123",
    role: "Finanzas",
    destination: "/financiadores",
    accent: "#F0A500",
  },
];

function HexIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 2L24.5 8.5V19.5L14 26L3.5 19.5V8.5L14 2Z" stroke="#00C896" strokeWidth="1.5" fill="rgba(0,200,150,0.15)" />
      <circle cx="14" cy="14" r="4" fill="#00C896" />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const session = useMemo(() => getAuthSession(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (session) {
    return <Navigate to={session.destination || "/dashboard"} replace />;
  }

  const submitLogin = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    const selectedDemo = DEMO_USERS.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());
    const destination = selectedDemo?.destination || "/dashboard";
    const role = selectedDemo?.role || "Usuario";
    const normalizedEmail = email.trim() || "usuario@muba.local";

    setAuthSession({
      email: normalizedEmail,
      role,
      destination,
      signedAt: new Date().toISOString(),
    });

    navigate(destination, { replace: true });
  };

  const fillDemo = (user) => {
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-[#090F18] px-4 py-6 text-[#F0F6FF] sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00C896] bg-[#1A2F45] shadow-[0_0_24px_rgba(0,200,150,0.18)]">
            <HexIcon size={20} />
          </div>
          <div>
            <h1 className="font-['Syne'] text-xl font-bold tracking-tight">MUBA - Login</h1>
            <p className="text-xs text-[#5A7A96]">Pantalla de acceso al sistema</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-[#00C896]/25 bg-[#00C896]/10 px-3 py-1 text-[11px] text-[#00C896]">Fase 1</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-[#8AADCC]">MVP v2.0</span>
        </div>
      </div>

      <div className="mx-auto overflow-hidden rounded-2xl border border-[#00C896]/15 bg-[#0D1B2A] shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-3 border-b border-white/5 bg-[#070E18] px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="mx-auto w-full max-w-[380px] rounded-md border border-white/10 bg-[#132336] px-3 py-1 text-center font-mono text-[11px] text-[#5A7A96]">
            app.muba.com.ar/login
          </div>
        </div>

        <div className="relative flex min-h-[calc(100vh-180px)] items-center justify-center overflow-hidden bg-[#090F18] px-4 py-10 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(0,200,150,0.08)_0%,transparent_60%),radial-gradient(ellipse_30%_30%_at_80%_100%,rgba(0,200,150,0.04)_0%,transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,200,150,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,200,150,0.03)_1px,transparent_1px)] bg-[length:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_0%,transparent_80%)]" />

          <div className="relative z-10 w-full max-w-[430px]">
            <div className="mb-8 flex flex-col items-center gap-3">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-[#00C896] bg-[#00C896]/10 shadow-[0_0_40px_rgba(0,200,150,0.25),0_0_0_8px_rgba(0,200,150,0.04)]">
                <HexIcon size={28} />
              </div>
              <p className="font-['Syne'] text-[28px] font-extrabold tracking-tight">MUBA</p>
              <p className="text-center text-xs text-[#5A7A96]">Sistema de Gestion para Instituciones de Salud</p>
            </div>

            <div className="rounded-2xl border border-[#00C896]/15 bg-[#132336] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.55)] sm:p-8">
              <p className="font-['Syne'] text-base font-bold">Iniciar sesion</p>
              <p className="mt-1 text-xs text-[#5A7A96]">Ingresa con tu email y contrasena institucional</p>

              <form className="mt-6" onSubmit={submitLogin}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8AADCC]">
                      Email
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-50">✉</span>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="usuario@institucion.com"
                        className="w-full rounded-[9px] border border-white/10 bg-[#1A2F45] py-[11px] pl-9 pr-3 text-[13px] text-[#F0F6FF] outline-none transition placeholder:text-[#5A7A96] focus:border-[#00C896]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8AADCC]">
                      Contrasena
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-50">🔒</span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-[9px] border border-white/10 bg-[#1A2F45] py-[11px] pl-9 pr-16 text-[13px] text-[#F0F6FF] outline-none transition placeholder:text-[#5A7A96] focus:border-[#00C896]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8AADCC] hover:text-[#00C896]"
                      >
                        {showPassword ? "Ocultar" : "Mostrar"}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#00C896] px-4 py-3 font-['Syne'] text-[13px] font-bold tracking-[0.03em] text-[#0D1B2A] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Validando..." : "Ingresar al sistema ->"}
                </button>

                <p className="mt-4 text-center text-xs text-[#5A7A96]">
                  <button type="button" className="text-[#00C896] hover:opacity-90">
                    Olvidaste tu contrasena?
                  </button>
                </p>
              </form>

              <div className="my-5 h-px bg-white/10" />

              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#5A7A96]">Cuentas demo</p>
                <div className="space-y-2">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.email}
                      type="button"
                      onClick={() => fillDemo(user)}
                      className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#1A2F45] px-3 py-2 text-left transition hover:border-[#00C896]/25"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: user.accent }} />
                      <span className="flex-1">
                        <span className="block font-mono text-[11px] text-[#8AADCC]">{user.email}</span>
                        <span className="mt-0.5 block text-[10px] text-[#5A7A96]">{user.role}</span>
                      </span>
                      <span className="text-[10px] text-[#5A7A96]">{user.destination}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-[11px] text-[#5A7A96]/70">MUBA MVP v2.0 · Acceso institucional</p>
          </div>
        </div>
      </div>
    </div>
  );
}
