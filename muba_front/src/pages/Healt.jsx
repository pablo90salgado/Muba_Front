import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HealtPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("http://localhost:8081/health", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setHealth(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("No se pudo consultar el endpoint /health");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-[#101828] text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Prueba de endpoint Healt</h1>
          <Link to="/" className="px-3 py-2 rounded bg-[#232e47] hover:bg-[#2d3a59]">
            Volver
          </Link>
        </div>

        <div className="bg-[#1A2236] border border-[#232e47] rounded p-4">
          {loading && <p className="text-gray-300">Consultando http://localhost:8081/health...</p>}

          {!loading && error && <p className="text-red-400">{error}</p>}

          {!loading && !error && (
            <pre className="text-sm text-green-300 overflow-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

