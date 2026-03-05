import { useParams, Link } from "react-router-dom";

export default function PisoPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-blue-100">
      <h1 className="text-2xl font-bold mb-4">Vista del Piso {id}</h1>
      <p>Aquí se mostrarán las camas del piso seleccionado.</p>
      <Link to="/" className="mt-6 text-blue-600 underline">
        Volver al Home
      </Link>
    </div>
  );
}