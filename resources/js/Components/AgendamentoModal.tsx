import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

type Servico = {
  id: number;
  nome: string;
};

type Agendamento = {
  id: number;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  observacao?: string;
  paciente: {
    nome: string;
  };
  servicos: Servico[];
};

type Props = {
  agendamento: Agendamento;
  servicosDisponiveis: Servico[];
  onClose: () => void;
};

export default function AgendamentoModal({
  agendamento,
  servicosDisponiveis,
  onClose,
}: Props) {
  const [editando, setEditando] = useState(false);

  const { data, setData, put, processing } = useForm({
    data: agendamento.data,
    hora_inicio: agendamento.hora_inicio,
    hora_fim: agendamento.hora_fim,
    observacao: agendamento.observacao ?? '',
    servicos: agendamento.servicos.map(s => s.id),
  });

  function salvarEdicao() {
    put(`/agendamentos/${agendamento.id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setEditando(false);
        onClose();
      },
    });
  }

  function handleDelete() {
    if (!confirm('Deseja realmente excluir este agendamento?')) return;

    router.delete(`/agendamentos/${agendamento.id}`, {
      preserveScroll: true,
      onSuccess: () => onClose(),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {editando
              ? `Editando agendamento de ${agendamento.paciente.nome}`
              : `Agendamento de ${agendamento.paciente.nome}`}
          </h2>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>

        {/* CONTEÚDO */}
        {!editando ? (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-slate-500">Horário</p>
              <p className="font-medium">
                {agendamento.hora_inicio} – {agendamento.hora_fim}
              </p>
            </div>

            <div>
              <p className="text-slate-500 mb-1">Serviços</p>
              <ul className="list-disc pl-5">
                {agendamento.servicos.map(servico => (
                  <li key={servico.id}>{servico.nome}</li>
                ))}
              </ul>
            </div>

            {agendamento.observacao && (
              <div>
                <p className="text-slate-500">Observação</p>
                <p>{agendamento.observacao}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={data.hora_inicio}
                onChange={e => setData('hora_inicio', e.target.value)}
                className="rounded-md border p-2"
              />

              <input
                type="time"
                value={data.hora_fim}
                onChange={e => setData('hora_fim', e.target.value)}
                className="rounded-md border p-2"
              />
            </div>

            <textarea
              value={data.observacao}
              onChange={e => setData('observacao', e.target.value)}
              className="w-full rounded-md border p-2"
              placeholder="Observação"
            />

            <div>
              <p className="text-slate-500 mb-1">Serviços</p>
              <div className="space-y-2">
                {servicosDisponiveis.map(servico => (
                  <label key={servico.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.servicos.includes(servico.id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setData('servicos', [...data.servicos, servico.id]);
                        } else {
                          setData(
                            'servicos',
                            data.servicos.filter(id => id !== servico.id)
                          );
                        }
                      }}
                    />
                    {servico.nome}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AÇÕES */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Fechar
          </button>

          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              Editar
            </button>
          ) : (
            <button
              disabled={processing}
              onClick={salvarEdicao}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              Salvar
            </button>
          )}

          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
          >
            Excluir
          </button>
        </div>

      </div>
    </div>
  );
}
