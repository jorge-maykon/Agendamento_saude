import React, { useState } from 'react';
import Layout from '@/Components/Layout';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function formatMonthYear(date: Date) {
    return date.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
    });
}

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11

    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekday = firstDayOfMonth.getDay(); // 0 = Domingo ... 6 = Sábado

    // Ajuste para semana começando em SEGUNDA
    const startIndex = (firstWeekday + 6) % 7;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monta as células do calendário
    const cells: (number | null)[] = [];

    // Espaços vazios antes do dia 1
    for (let i = 0; i < startIndex; i++) {
        cells.push(null);
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        cells.push(day);
    }

    // Completa até múltiplo de 7
    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    function goToPreviousMonth() {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    }

    function goToNextMonth() {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    }

    function handleSelectDay(day: number | null) {
        if (!day) return;
        const d = new Date(year, month, day);
        setSelectedDate(d);
    }

    const selectedDayNumber =
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month
            ? selectedDate.getDate()
            : null;

    return (
        <Layout title="Agenda">
            <div className="max-w-4xl mx-auto">
                {/* Cabeçalho */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                            Agenda
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {formatMonthYear(currentDate)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={goToPreviousMonth}
                            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
                        >
                            ← Mês anterior
                        </button>
                        <button
                            type="button"
                            onClick={goToNextMonth}
                            className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
                        >
                            Próximo mês →
                        </button>
                    </div>
                </div>

                {/* Calendário */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                    {/* Dias da semana */}
                    <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 mb-2">
                        {weekDays.map((day) => (
                            <div key={day} className="py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Dias do mês */}
                    <div className="grid grid-cols-7 gap-1 text-sm">
                        {cells.map((day, index) => {
                            const isToday =
                                day &&
                                new Date().toDateString() ===
                                    new Date(year, month, day).toDateString();

                            const isSelected =
                                day && selectedDayNumber === day;

                            const baseClasses =
                                'aspect-square rounded-lg flex items-center justify-center border text-sm transition';

                            let extraClasses = '';

                            if (!day) {
                                extraClasses += ' border-transparent cursor-default';
                            } else {
                                extraClasses +=
                                    ' border-slate-200 hover:border-emerald-400 hover:bg-emerald-50';
                            }

                            if (isToday) {
                                extraClasses += ' border-emerald-500';
                            }

                            if (isSelected) {
                                extraClasses +=
                                    ' bg-emerald-600 text-white hover:bg-emerald-600 hover:border-emerald-600';
                            }

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleSelectDay(day)}
                                    className={`${baseClasses} ${extraClasses}`}
                                    disabled={!day}
                                >
                                    {day ?? ''}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Agendamentos do dia selecionado */}
                <div className="mt-6">
                    <h2 className="text-sm font-semibold text-slate-700 mb-2">
                        Agendamentos do dia
                    </h2>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-sm text-slate-500">
                        {selectedDate ? (
                            <p>
                                Nenhum agendamento cadastrado para{' '}
                                <span className="font-medium">
                                    {selectedDate.toLocaleDateString('pt-BR')}
                                </span>
                                . (Ainda estamos só com a interface; depois
                                vamos ligar com o banco.)
                            </p>
                        ) : (
                            <p>Selecione um dia no calendário.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
