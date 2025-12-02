import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function PacientesIndex() {
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
            className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-700"
          >
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
              </tr>
            </thead>
            <tbody>
              {pacientes.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-slate-500"
                  >
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
