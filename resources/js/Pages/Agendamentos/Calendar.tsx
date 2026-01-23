import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';
import AgendamentoModal from '@/Components/AgendamentoModal';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function formatMonthYear(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}

type Agendamento = {
  id: number;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  observacao?: string;
  paciente: {
    nome: string;
  };
  servicos: {
    id: number;
    nome: string;
  }[];
};

type Props = {
  agendamentos?: Agendamento[];
};

export default function CalendarPage({ agendamentos = [] }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
  useState<Agendamento | null>(null);


  useEffect(() => {
    if (agendamentos.length > 0) {
      setCurrentDate(new Date(agendamentos[0].data));
    }
  }, [agendamentos]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startIndex = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startIndex; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length < 42) cells.push(null); // 6 semanas fixas

  const today = new Date();
  const isToday = (day: number) =>
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  const agendamentosPorDia = agendamentos.reduce<Record<string, Agendamento[]>>(
    (acc, ag) => {
      if (!acc[ag.data]) acc[ag.data] = [];
      acc[ag.data].push(ag);
      return acc;
    },
    {}
  );

  function handleSelectDay(day: number | null) {
    if (!day) return;
    setSelectedDate(new Date(year, month, day));
  }

  const selectedDayNumber =
    selectedDate &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month
      ? selectedDate.getDate()
      : null;

  return (
    <Layout title="Agendamentos">
      <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col">

        {/* Cabeçalho */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-400">Agenda</p>
            <h1 className="text-2xl font-semibold">
              {formatMonthYear(currentDate)}
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(year, month - 1, 1)
                )
              }
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              ← Mês anterior
            </button>

            <button
              onClick={() =>
                setCurrentDate(
                  new Date(year, month + 1, 1)
                )
              }
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Próximo mês →
            </button>

            <Link
              href="/agendamentos/novo"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm text-white"
            >
              Novo Atendimento
            </Link>
          </div>
        </div>

        {/* CALENDÁRIO */}
        <div className="flex-1 bg-white shadow-sm rounded-xl border border-slate-200 p-4 px-4 py-3">

          {/* Dias da semana */}
          <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
            {weekDays.map(d => <div key={d}>{d}</div>)}
          </div>

          {/* Grade */}
          <div className="grid grid-cols-7 grid-rows-6 gap-2 h-full">
            {cells.map((day, index) => {
              if (!day) return <div key={index} />;

              const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const temEvento = agendamentosPorDia[dateKey];

              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectDay(day)}
                  className={`
                   relative border rounded-md text-sm flex items-center justify-center 
                   transition
                    ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isToday(day)
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }
                  `}
                >
                  {day}

                  {temEvento && !isSelected && (
                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista */}
        <div className="mt-3 rounded-xl bg-white border border-slate-200 p-3 text-sm h-20 overflow-auto">
          {selectedDayNumber ? (
            agendamentosPorDia[
              `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDayNumber).padStart(2, '0')}`
            ]?.length ? (
              agendamentosPorDia[
                `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDayNumber).padStart(2, '0')}`
              ].map(ag => (
                <button
                  key={ag.id}
                  onClick={() => setAgendamentoSelecionado(ag)}
                  className="
                    w-60 text-left rounded-lg border border-slate-200 p-3
                    hover:border-emerald-400 hover:bg-emerald-50
                    transition flex flex-col gap-1
                  "
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {ag.hora_inicio} – {ag.hora_fim}
                  </span>
S
                  <span className="text-sm text-slate-600">
                    {ag.paciente.nome}
                  </span>

                  {/* espaço futuro */}
                  {/* <span className="text-xs text-slate-400">Corte Masculino</span> */}
                </button>
              ))
            ) : (
              <p>Nenhum agendamento para este dia.</p>
            )
          ) : (
            <p>Selecione um dia no calendário.</p>
          )}

          
        </div>

      </div>
{agendamentoSelecionado && (
  <AgendamentoModal
    agendamento={agendamentoSelecionado}
    onClose={() => setAgendamentoSelecionado(null)}
  />
)}

    </Layout>
  );
}
