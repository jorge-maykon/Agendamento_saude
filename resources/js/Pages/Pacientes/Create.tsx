import React, { FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function PacientesCreate() {
  const { data, setData, post, processing, errors } = useForm({
    nome: '',
    telefone: '',
    documento: '',
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    post('/pacientes');
  }

  return (
    <Layout>
      <Head title="Novo paciente" />

      <div className="p-6 space-y-6 max-w-xl">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Novo paciente
            </h1>
            <p className="text-sm text-slate-500">
              Preencha os dados para cadastrar um novo paciente.
            </p>
          </div>

          <Link
            href="/pacientes"
            className="text-sm text-slate-600 hover:underline"
          >
            Voltar para a lista
          </Link>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm"
        >
          {/* Nome */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Nome
            </label>
            <input
              type="text"
              value={data.nome}
              onChange={e => setData('nome', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            {errors.nome && (
              <p className="text-xs text-red-600 mt-1">{errors.nome}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Telefone
            </label>
            <input
              type="text"
              value={data.telefone}
              onChange={e => setData('telefone', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="(61) 99999-0000"
            />
            {errors.telefone && (
              <p className="text-xs text-red-600 mt-1">{errors.telefone}</p>
            )}
          </div>

          {/* Documento */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">
              Documento
            </label>
            <input
              type="text"
              value={data.documento}
              onChange={e => setData('documento', e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="CPF ou outro documento"
            />
            {errors.documento && (
              <p className="text-xs text-red-600 mt-1">{errors.documento}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Link
              href="/pacientes"
              className="px-4 py-2 rounded-md border border-slate-300 text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              Cadastrar paciente
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
