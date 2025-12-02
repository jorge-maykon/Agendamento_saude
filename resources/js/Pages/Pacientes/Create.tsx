import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function ClientesCreate() {
  return (
    <Layout>
      <Head title="Novo paciente"/>
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-semibold text-slate-800">
          Novo paciente
        </h1>
        <p className="text-sm text-slate-500">
          Aqui vamos montar o formulário de cadastro de paciente.
        </p>
      </div>
    </Layout>
  );
}
