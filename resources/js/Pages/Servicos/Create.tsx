import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nome: '',
        descricao: '',
        preco: '',
        duracao_minutos: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post('/servicos', {
            onSuccess: () => {
                // se quiser, limpa o formulário depois de salvar
                reset('nome', 'descricao', 'preco', 'duracao_minutos');
            },
        });
    }

    return (
        <Layout title="Novo serviço">
            <div className="max-w-2xl mx-auto">
                {/* CABEÇALHO */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800">
                            Novo serviço
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Cadastre um novo tipo de atendimento para ser usado nos agendamentos.
                        </p>
                    </div>

                    <Link
                        href="/servicos"
                        className="text-sm text-slate-500 hover:text-slate-700"
                    >
                        Voltar para a lista
                    </Link>
                </div>

                {/* CARD DO FORMULÁRIO */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Nome do serviço
                            </label>
                            <input
                                type="text"
                                value={data.nome}
                                onChange={(e) => setData('nome', e.target.value)}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                            />
                            {errors.nome && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.nome}
                                </p>
                            )}
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Descrição
                            </label>
                            <textarea
                                value={data.descricao}
                                onChange={(e) =>
                                    setData('descricao', e.target.value)
                                }
                                rows={3}
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                            />
                            {errors.descricao && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.descricao}
                                </p>
                            )}
                        </div>

                        {/* Preço e duração lado a lado */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Preço (R$)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.preco}
                                    onChange={(e) =>
                                        setData('preco', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                />
                                {errors.preco && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.preco}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Duração (minutos)
                                </label>
                                <input
                                    type="number"
                                    value={data.duracao_minutos}
                                    onChange={(e) =>
                                        setData('duracao_minutos', e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                />
                                {errors.duracao_minutos && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.duracao_minutos}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* BOTÕES */}
                        <div className="pt-3 flex items-center justify-end space-x-3">
                            <Link
                                href="/servicos"
                                className="text-sm text-slate-500 hover:text-slate-700"
                            >
                                Cancelar
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 disabled:opacity-60"
                            >
                                Salvar serviço
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
