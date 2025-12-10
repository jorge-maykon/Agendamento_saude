import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function PacientesIndex() {

  function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) {
      return;
    }

    router.delete(`/pacientes/${id}`);
  }

  // pega os dados vindos do Laravel
  const { pacientes = [] } = usePage().props as any;

  return (
    <Layout>
      <Head title="Pacientes" />

      <div className="p-6 space-y-4">
        {/* Título + botão novo */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Pacientes
            </h1>
            <p className="text-sm text-slate-500">
              Lista de pacientes cadastrados no sistema.
            </p>
          </div>

          {/* Link para o formulário de novo paciente */}
          <Link
            href="/pacientes/novo"
            className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700">
            Novo paciente
          </Link>
        </div>

        {/* Tabela */}
        <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-slate-500 font-medium">
                  #
                </th>
                <th className="px-4 py-2 text-left text-slate-500 font-medium">
                  Nome
                </th>
                <th className="px-4 py-2 text-left text-slate-500 font-medium">
                  Telefone
                </th>
                <th className="px-4 py-2 text-left text-slate-500 font-medium">
                  Documento
                </th>
                <th className="px-4 py-2 text-left text-slate-500 font-medium">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientes.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500">
                    Nenhum paciente cadastrado.
                  </td>
                </tr>
              )}

              {pacientes.map((paciente: any) => (
                <tr key={paciente.id} className="border-t border-slate-100">
                  <td className="px-4 py-2 text-slate-600">{paciente.id}</td>
                  <td className="px-4 py-2 text-slate-800">{paciente.nome}</td>
                  <td className="px-4 py-2 text-slate-700">
                    {paciente.telefone}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
                    {paciente.documento}
                  </td>
                  <td className="px-4 py-2 text-slate-700">
  <div className="flex gap-2">

    {/* EDITAR */}
    <Link
      href={`/pacientes/${paciente.id}/editar`}
      className="
        inline-flex items-center
        px-2 py-1 text-xs font-medium
        text-emerald-700 bg-emerald-50
        border border-emerald-200 rounded-md
        hover:bg-emerald-100 hover:text-emerald-800
        transition
      "
    >
      Editar
    </Link>

    {/* EXCLUIR */}
    <button
      type="button"
      onClick={() => handleDelete(paciente.id)}
      className="
        inline-flex items-center
        px-2 py-1 text-xs font-medium
        text-red-700 bg-red-50
        border border-red-200 rounded-md
        hover:bg-red-100 hover:text-red-800
        transition
      "
    >
      Excluir
    </button>

  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
