import Layout from '@/Components/Layout';
import { Link, router, usePage } from '@inertiajs/react';

type Servico = {
    id: number;
    nome: string;
    descricao?: string | null;
    preco: number;
    duracao_minutos?: number | null;
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PageProps = {
    servicos: {
        data: Servico[];
        links: PaginationLink[];
    };
};

function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
        return;
    }

    router.delete(`/servicos/${id}`, {
        preserveScroll: true,
    });
}

export default function ServicosIndex() {
    const { servicos } = usePage<PageProps>().props;

    const lista = servicos.data ?? [];
    const links = servicos.links ?? [];

    return (
        <Layout title="Serviços">
            {/* Cabeçalho + botão Novo serviço */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Serviços</h1>
                    <p className="mt-1 text-sm text-slate-500">Lista de serviços para os pacientes.</p>
                </div>
                <Link
                    href="/servicos/novo"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 focus:outline-none"
                >
                    Novo serviço
                </Link>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                {/* Tabela com scroll para não “estourar” o layout */}
                <div className="max-h-[480px] overflow-y-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Nome</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Preço</th>
                                <th className="px-4 py-3 font-medium text-slate-500">Duração (min)</th>
                                <th className="px-4 py-3 text-right font-medium text-slate-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((servico) => (
                                <tr key={servico.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-2 text-slate-700">{servico.id}</td>
                                    <td className="px-4 py-2 text-slate-700">{servico.nome}</td>
                                    <td className="px-4 py-2 text-slate-700">R$ {servico.preco.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-slate-700">{servico.duracao_minutos ?? '-'}</td>
                                    <td className="space-x-2 px-4 py-2 text-right">
                                        <Link
                                            href={`/agendamentos/novo?servico_id=${servico.id}`}
                                            className="text-xs text-emerald-700 hover:underline"
                                        >
                                            Agendar
                                        </Link>

                                        <Link href={`/servicos/${servico.id}/editar`} className="text-xs text-emerald-700 hover:underline">
                                            Editar
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(servico.id)}
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
                                        Nenhum serviço cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                <div className="flex justify-end border-t border-slate-200 px-4 py-3">
                    <nav className="flex items-center gap-1 text-xs">
                        {links.map((link, index) => {
                            const label = link.label
                                .replace('&laquo;', '«')
                                .replace('&raquo;', '»')
                                .replace('Previous', 'Anterior')
                                .replace('Next', 'Próximo');

                            const isDisabled = !link.url;

                            return (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={
                                        'rounded px-2 py-1 ' +
                                        (link.active
                                            ? 'bg-emerald-600 text-white'
                                            : isDisabled
                                              ? 'cursor-default text-slate-300'
                                              : 'text-slate-600 hover:bg-slate-100')
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
