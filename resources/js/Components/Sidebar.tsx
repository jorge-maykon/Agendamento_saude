export default function Sidebar() {
    return (
        <div className="w-60 bg-gray-900 text-white p-4 space-y-4">

            <h2 className="text-xl font-bold mb-6">Sistema</h2>

            <nav className="space-y-3">
                <a href="/" className="block hover:text-yellow-400">Home</a>
                <a href="/pacientes" className="block hover:text-yellow-400">Pacientes</a>
                <a href="/servicos" className="block hover:text-yellow-400">Serviços</a>
                <a href="/agendamentos" className="block hover:text-yellow-400">Agendamentos</a>
            </nav>

        </div>
    );
}
