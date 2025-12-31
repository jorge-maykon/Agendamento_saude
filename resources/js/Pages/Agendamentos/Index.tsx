import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Agendamento = {
    id: number;
    data: string;            // "2025-12-20"
    hora_inicio: string;     // "09:00:00"
    hora_fim?: string | null;
    status: string;
    observacao?: string | null;
    paciente?: { id: number; nome: string };
    servico?: { id: number; nome: string };
};

type PageProps = {
    agendamentos: Agendamento[];
};

export default function AgendamentosIndex() {
    const { agendamentos = [] } = usePage<PageProps>().props;

    return (
        <Layout title="Agenda">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Agenda de atendimentos
                </h1>

                <Link
                    href={route('agendamentos.create')}
                    className="inline-flex items-center px-4 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    + Novo agendamento
                </Link>
            </div>

            {/* Lista simples (depois evoluímos para calendário visual) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-2">Data</th>
                            <th className="px-4 py-2">Horário</th>
                            <th className="px-4 py-2">Paciente</th>
                            <th className="px-4 py-2">Serviço</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agendamentos.map((ag) => (
                            <tr
                                key={ag.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                <td className="px-4 py-2 text-slate-700">
                                    {new Date(ag.data).toLocaleDateString('pt-BR')}
                                </td>

                                <td className="px-4 py-2 text-slate-700">
                                    {ag.hora_inicio.slice(0, 5)}
                                    {ag.hora_fim && ` - ${ag.hora_fim.slice(0, 5)}`}
                                </td>

                                <td className="px-4 py-2 text-slate-700">
                                    {ag.paciente?.nome ?? '-'}
                                </td>

                                <td className="px-4 py-2 text-slate-700">
                                    {ag.servico?.nome ?? '-'}
                                </td>

                                <td className="px-4 py-2">
                                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                                        {ag.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {agendamentos.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-slate-400 text-sm"
                                >
                                    Nenhum agendamento cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
