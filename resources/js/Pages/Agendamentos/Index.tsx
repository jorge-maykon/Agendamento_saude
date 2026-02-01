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
            {/* CONTAINER CENTRALIZADO E COM LARGURA MÁXIMA */}
            <div className="max-w-5xl mx-auto px-4 py-6">
                {/* CARD DO CALENDÁRIO */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-x-auto">
                    {/* Cabeçalho do mês + navegação */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                        {/* ... título do mês e botões anterior/próximo ... */}
                    </div>

                    {/* GRID DO CALENDÁRIO */}
                    <div className="p-4 min-w-[700px]">
                        {/* dias da semana */}
                        <div className="grid grid-cols-7 gap-3 mb-2 text-xs font-medium text-slate-500 text-center">
                            <span>Dom</span>
                            <span>Seg</span>
                            <span>Ter</span>
                            <span>Qua</span>
                            <span>Qui</span>
                            <span>Sex</span>
                            <span>Sáb</span>
                        </div>

                        {/* dias do mês */}
                        <div className="grid grid-cols-7 gap-3">
                            {/* aqui vão os botões/dias */}
                            {/* cada dia algo como: */}
                            {/* 
                            <button
                                key={dia}
                                className="aspect-square w-full rounded-lg border text-sm flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600"
                            >
                                {dia}
                            </button> 
                            */}
                        </div>
                    </div>
                </div>

                {/* LISTA “AGENDAMENTOS DO DIA” */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="px-4 py-3 border-b border-slate-200">
                        <h2 className="text-sm font-medium text-slate-700">
                            Agendamentos do dia
                        </h2>
                    </div>

                    <div className="px-4 py-4 text-sm text-slate-500">
                        Nenhum agendamento cadastrado para 14/01/2026.
                        <span className="text-slate-400">
                            {' '}
                            (Ainda estamos só com a interface; depois vamos ligar com o banco.)
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
    
    
    return (
        <Layout title="Agenda">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Agenda de atendimentos
                </h1>

                <Link
                    href="/agendamentos/novo"

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
