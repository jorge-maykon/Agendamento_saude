import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import Layout from '@/Components/Layout';

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
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Pacientes
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Lista de pacientes cadastrados para agendamentos.
                    </p>
                </div>

                <Link
                    href="/pacientes/novo"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                >
                    + Novo paciente
                </Link>
            </div>

            {/* CARD DA TABELA */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                {/* TABELA COM SCROLL */}
                <div className="max-h-[480px] overflow-y-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-slate-500 font-medium">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-slate-500 font-medium">
                                    Nome
                                </th>
                                <th className="px-4 py-3 text-slate-500 font-medium">
                                    Telefone
                                </th>
                                <th className="px-4 py-3 text-slate-500 font-medium">
                                    Documento
                                </th>
                                <th className="px-4 py-3 text-slate-500 font-medium text-right">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.map((paciente) => (
                                <tr
                                    key={paciente.id}
                                    className="border-b border-slate-100 hover:bg-slate-50"
                                >
                                    <td className="px-4 py-2 text-slate-700">
                                        {paciente.id}
                                    </td>
                                    <td className="px-4 py-2 text-slate-700">
                                        {paciente.nome}
                                    </td>
                                    <td className="px-4 py-2 text-slate-700">
                                        {paciente.telefone || '—'}
                                    </td>
                                    <td className="px-4 py-2 text-slate-700">
                                        {paciente.documento || '—'}
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-3">
                                        <Link
                                            href={`/pacientes/${paciente.id}/editar`}
                                            className="text-emerald-700 text-xs hover:underline"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(paciente.id)
                                            }
                                            className="text-red-600 text-xs hover:underline"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {lista.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-slate-400 text-sm"
                                    >
                                        Nenhum paciente cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINAÇÃO */}
                <div className="px-4 py-3 border-t border-slate-200 flex justify-end">
                    <nav className="flex items-center gap-1 text-xs">
                        {links.map((link, index) => {
                            // link.label às vezes vem com HTML (&laquo;, &raquo;)
                            const label = link.label
                                .replace('&laquo;', '«')
                                .replace('&raquo;', '»');

                            return (
                                <Link
                                    key={index}
                                    href={link.url ?? '#'}
                                    preserveScroll
                                    className={
                                        'px-2 py-1 rounded ' +
                                        (link.active
                                            ? 'bg-emerald-600 text-white'
                                            : link.url
                                            ? 'text-slate-600 hover:bg-slate-100'
                                            : 'text-slate-300 cursor-default')
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
