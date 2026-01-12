import React, { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Paciente = {
  id: number;
  nome: string;
};

type Servico = {
  id: number;
  nome: string;
};

type PageProps = {
  pacientes: Paciente[];
  servicos: Servico[];
};

export default function AgendamentosCreate() {
  const { pacientes, servicos } = usePage<PageProps>().props;

  const [pacienteSearch, setPacienteSearch] = useState('');

  const { data, setData, post, processing, errors } = useForm({
    paciente_id: '',
    data: '',
    hora_inicio: '',
    servicos: [] as number[],
    observacao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/agendamentos', {
      onSuccess: () => {
        // redirecionamento é feito no backend
      },
    });
  };

  return (
    <Layout title="Novo agendamento">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border p-6">
        <h1 className="text-xl font-semibold mb-4">Novo agendamento</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Paciente */}
          <div>
            <label className="block text-sm font-medium mb-1">Paciente</label>
            <input
              list="pacientes-list"
              value={pacienteSearch}
              onChange={(e) => {
                const value = e.target.value;
                setPacienteSearch(value);

                const paciente = pacientes.find(p => p.nome === value);
                setData('paciente_id', paciente ? paciente.id : '');
              }}
              className="w-full rounded-md border-slate-300 text-sm"
            />
            <datalist id="pacientes-list">
              {pacientes.map(p => (
                <option key={p.id} value={p.nome} />
              ))}
            </datalist>
            {errors.paciente_id && (
              <p className="text-xs text-red-600">{errors.paciente_id}</p>
            )}
          </div>

          {/* Serviços (múltiplos) */}
          <div>
            <label className="block text-sm font-medium mb-1">Serviços</label>
            <select
              multiple
              value={data.servicos}
              onChange={(e) =>
                setData(
                  'servicos',
                  Array.from(e.target.selectedOptions, opt => Number(opt.value))
                )
              }
              className="w-full rounded-md border-slate-300 text-sm"
            >
              {servicos.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
            {errors.servicos && (
              <p className="text-xs text-red-600">{errors.servicos}</p>
            )}
          </div>

          {/* Data e hora */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Data</label>
              <input
                type="date"
                value={data.data}
                onChange={e => setData('data', e.target.value)}
                className="w-full rounded-md border-slate-300 text-sm"
              />
              {errors.data && (
                <p className="text-xs text-red-600">{errors.data}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Hora início</label>
              <input
                type="time"
                value={data.hora_inicio}
                onChange={e => setData('hora_inicio', e.target.value)}
                className="w-full rounded-md border-slate-300 text-sm"
              />
              {errors.hora_inicio && (
                <p className="text-xs text-red-600">{errors.hora_inicio}</p>
              )}
            </div>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-sm mb-1">Observação</label>
            <textarea
              value={data.observacao}
              onChange={e => setData('observacao', e.target.value)}
              className="w-full rounded-md border-slate-300 text-sm"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-4">
            <Link href="/agenda" className="text-sm text-slate-500">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Salvar agendamento
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}