import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Servico = {
    id: number;
    nome: string;
    descricao?: string | null;
    preco: number;
    duracao_minutos?: number | null;
};

type PageProps = {
    servicos: Servico[];
};

export default function Index() {
    const { props } = usePage<PageProps>();
    const servicos = props.servicos ?? [];

    function handleDelete(id: number) {
        if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

        router.delete(`/servicos/${id}`);
    }

    return (
        <Layout title="Serviços">
            {/* CABEÇALHO */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Serviços
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Gerencie os tipos de atendimento oferecidos na clínica.
                    </p>
                </div>

                <Link
                    href="/servicos/novo"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                >
                    + Novo serviço
                </Link>
            </div>

            {/* TABELA */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 text-slate-500 font-medium">
                                ID
                            </th>
                            <th className="px-6 py-3 text-slate-500 font-medium">
                                Nome
                            </th>
                            <th className="px-6 py-3 text-slate-500 font-medium">
                                Preço
                            </th>
                            <th className="px-6 py-3 text-slate-500 font-medium">
                                Duração
                            </th>
                            <th className="px-6 py-3 text-slate-500 font-medium text-right">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((servico) => (
                            <tr
                                key={servico.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                <td className="px-6 py-3 text-slate-700">
                                    {servico.id}
                                </td>
                                <td className="px-6 py-3 text-slate-700">
                                    {servico.nome}
                                </td>
                                <td className="px-6 py-3 text-slate-700">
                                    R$ {servico.preco.toFixed(2)}
                                </td>
                                <td className="px-6 py-3 text-slate-700">
                                    {servico.duracao_minutos
                                        ? `${servico.duracao_minutos} min`
                                        : '—'}
                                </td>
                                <td className="px-6 py-3 text-right space-x-3">
                                    <Link
                                        href={`/servicos/${servico.id}/editar`}
                                        className="text-emerald-700 text-xs hover:underline"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(servico.id)}
                                        className="text-red-600 text-xs hover:underline"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {servicos.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-8 text-center text-slate-400 text-sm"
                                >
                                    Nenhum serviço cadastrado ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
