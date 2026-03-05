import BedCard from "./components/BedCard";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Gestión de Camas</h1>
      <BedCard estado="libre" numero={1} />
      <BedCard estado="ocupada" numero={2} />
      <BedCard estado="bloqueada" numero={3} />
    </div>
  );
}

export default App;


