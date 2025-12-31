import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Option = {
    id: number;
    nome: string;
};

type PageProps = {
    pacientes: Option[];
    servicos: Option[];
    defaultPacienteId?: number | null;
    defaultServicoId?: number | null;
};

export default function AgendamentosCreate() {
    const {
        pacientes,
        servicos,
        defaultPacienteId,
        defaultServicoId,
    } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        paciente_id: defaultPacienteId ?? '',
        servico_id: defaultServicoId ?? '',
        data: '',
        hora_inicio: '',
        hora_fim: '',
        observacao: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('agendamentos.store'));
    }

    return (
        <Layout title="Novo agendamento">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-slate-800">
                        Novo agendamento
                    </h1>

                    <Link
                        href={route('agendamentos.index')}
                        className="text-xs text-slate-500 hover:underline"
                    >
                        Voltar para a agenda
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Paciente */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Paciente
                        </label>
                        <select
                            value={data.paciente_id}
                            onChange={e => setData('paciente_id', e.target.value)}
                            className="w-full rounded-md border-slate-300 text-sm"
                        >
                            <option value="">Selecione um paciente...</option>
                            {pacientes.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </select>
                        {errors.paciente_id && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.paciente_id}
                            </p>
                        )}
                    </div>

                    {/* Serviço */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Serviço
                        </label>
                        <select
                            value={data.servico_id}
                            onChange={e => setData('servico_id', e.target.value)}
                            className="w-full rounded-md border-slate-300 text-sm"
                        >
                            <option value="">Selecione um serviço...</option>
                            {servicos.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.nome}
                                </option>
                            ))}
                        </select>
                        {errors.servico_id && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.servico_id}
                            </p>
                        )}
                    </div>

                    {/* Data */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Data
                            </label>
                            <input
                                type="date"
                                value={data.data}
                                onChange={e => setData('data', e.target.value)}
                                className="w-full rounded-md border-slate-300 text-sm"
                            />
                            {errors.data && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.data}
                                </p>
                            )}
                        </div>

                        {/* Hora início */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Hora de início
                            </label>
                            <input
                                type="time"
                                value={data.hora_inicio}
                                onChange={e => setData('hora_inicio', e.target.value)}
                                className="w-full rounded-md border-slate-300 text-sm"
                            />
                            {errors.hora_inicio && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.hora_inicio}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Hora fim opcional */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Hora de término (opcional)
                        </label>
                        <input
                            type="time"
                            value={data.hora_fim}
                            onChange={e => setData('hora_fim', e.target.value)}
                            className="w-full rounded-md border-slate-300 text-sm"
                        />
                        {errors.hora_fim && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.hora_fim}
                            </p>
                        )}
                    </div>

                    {/* Observação */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Observação
                        </label>
                        <textarea
                            value={data.observacao}
                            onChange={e => setData('observacao', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border-slate-300 text-sm"
                        />
                        {errors.observacao && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.observacao}
                            </p>
                        )}
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                        <Link
                            href={route('agendamentos.index')}
                            className="px-3 py-1.5 text-xs rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-1.5 text-xs font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            Salvar agendamento
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
