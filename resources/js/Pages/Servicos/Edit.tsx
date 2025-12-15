import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Servico = {
    id: number;
    nome: string;
    descricao: string | null;
    preco: number;
    duracao_minutos: number | null;
};

type PageProps = {
    servico: Servico;
};

export default function Edit() {
    const { servico } = usePage<PageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        nome: servico.nome ?? '',
        descricao: servico.descricao ?? '',
        preco: servico.preco.toString(),
        duracao_minutos: servico.duracao_minutos
            ? servico.duracao_minutos.toString()
            : '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(route('servicos.update', servico.id));
    }

    return (
        <Layout title={`Editar serviço: ${servico.nome}`}>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Editar serviço
                </h1>

                <Link
                    href={route('servicos.index')}
                    className="text-sm text-slate-600 hover:underline"
                >
                    Voltar para a lista
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Nome do serviço
                        </label>
                        <input
                            type="text"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        {errors.nome && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.nome}
                            </p>
                        )}
                    </div>

                    {/* Preço */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Preço (R$)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.preco}
                            onChange={(e) => setData('preco', e.target.value)}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        {errors.preco && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.preco}
                            </p>
                        )}
                    </div>

                    {/* Duração */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Duração (minutos)
                        </label>
                        <input
                            type="number"
                            value={data.duracao_minutos}
                            onChange={(e) =>
                                setData('duracao_minutos', e.target.value)
                            }
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        {errors.duracao_minutos && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.duracao_minutos}
                            </p>
                        )}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Descrição (opcional)
                        </label>
                        <textarea
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            rows={3}
                            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        {errors.descricao && (
                            <p className="text-xs text-red-600 mt-1">
                                {errors.descricao}
                            </p>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="pt-2 flex items-center justify-end space-x-3">
                        <Link
                            href={route('servicos.index')}
                            className="px-4 py-2 text-sm rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-5 py-2 text-sm font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
