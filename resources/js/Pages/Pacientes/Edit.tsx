import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function PacientesEdit() {
  const { paciente } = usePage().props as any;

  return (
    <Layout>
      <Head title={`Editar paciente ${paciente?.nome ?? ''}`} />

      <div className="p-6 space-y-4 max-w-xl">
        <h1 className="text-xl font-semibold text-slate-800">
          Editar paciente
        </h1>
        <p className="text-sm text-slate-500">
          Aqui vamos montar o formulário para editar os dados do paciente.
        </p>

        {/* Só exibindo informações por enquanto */}
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-medium">ID:</span> {paciente.id}
          </p>
          <p>
            <span className="font-medium">Nome:</span> {paciente.nome}
          </p>
          <p>
            <span className="font-medium">Telefone:</span> {paciente.telefone}
          </p>
          <p>
            <span className="font-medium">Documento:</span> {paciente.documento}
          </p>
        </div>
      </div>
    </Layout>
  );
}
