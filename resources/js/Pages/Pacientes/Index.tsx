import Layout from '@/Components/Layout';
import { Link, router, usePage } from '@inertiajs/react';

type Paciente = {
    id: number;
    nome: string;
    telefone?: string | null;
    documento?: string | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    pacientes: {
        data: Paciente[];
        links: PaginationLink[];
    };
};

export default function PacientesIndex() {
    const { pacientes } = usePage<PageProps>().props;

    const lista = pacientes.data ?? [];
    const links = pacientes.links ?? [];

    function handleDelete(id: number) {
        if (!confirm('Tem certeza que deseja excluir este paciente?')) return;

        router.delete(`/pacientes/${id}`);
    }

    return (
        <Layout title="Pacientes">
            {/* CABEÇALHO */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Pacientes</h1>
                    <p className="mt-1 text-sm text-slate-500">Lista de pacientes cadastrados para agendamentos.</p>
                </div>

                <Link
                    href="/pacientes/novo"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus:outline-none"
                >
                    Novo paciente
                </Link>
            </div>

            {/* CARD DA TABELA */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* TABELA COM SCROLL */}
                <div className="max-h-[480px] overflow-y-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Nome</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Telefone</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Documento</th>
                                <th className="px-4 py-3 text-right font-medium text-slate-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((paciente) => (
                                <tr key={paciente.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-2 text-slate-700">{paciente.id}</td>
                                    <td className="px-4 py-2 text-slate-700">{paciente.nome}</td>
                                    <td className="px-4 py-2 text-slate-700">{paciente.telefone || '—'}</td>
                                    <td className="px-4 py-2 text-slate-700">{paciente.documento || '—'}</td>
                                    <td className="space-x-3 px-4 py-2 text-right">
                                        <Link
                                            href="agendamentos.create', { paciente_id: paciente.id }"
                                            className="text-xs text-emerald-700 hover:underline"
                                        >
                                            Agendar
                                        </Link>

                                        <Link href={`/pacientes/${paciente.id}/editar`} className="text-xs text-emerald-700 hover:underline">
                                            Editar
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(paciente.id)}
                                            className="text-xs text-red-600 hover:underline"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {lista.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-slate-400">
                                        Nenhum paciente cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINAÇÃO */}
                <div className="flex justify-end border-t border-slate-200 px-4 py-3">
                    <nav className="flex items-center gap-1 text-xs">
                        {links.map((link, index) => {
                            let label = link.label;

                            // Tradução dos textos especiais do Laravel
                            if (label.includes('Previous')) {
                                label = 'Anterior';
                            } else if (label.includes('Next')) {
                                label = 'Próximo';
                            } else {
                                // Para os números / « » mantém tratamento básico
                                label = label.replace('&laquo;', '«').replace('&raquo;', '»');
                            }

                            return (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={
                                        'rounded px-2 py-1 ' +
                                        (link.active
                                            ? 'bg-emerald-600 text-white'
                                            : link.url
                                              ? 'text-slate-600 hover:bg-slate-100'
                                              : 'cursor-default text-slate-300')
                                    }
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </Layout>
    );
}
