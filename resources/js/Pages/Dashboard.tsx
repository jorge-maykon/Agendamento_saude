import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Components/Layout';

export default function Dashboard() {
  // Data de hoje em formato pt-BR (ex.: 01/12/2025)
  const hoje = new Date().toLocaleDateString('pt-BR');

  return (
    <Layout>
      <Head title="Dashboard" />

      <div className="dashboard-page">
        {/* TOPO */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Agendamento Saúde</h1>
            <p className="dashboard-subtitle">
              Visão geral dos agendamentos e atendimentos.
            </p>
          </div>
          <div className="dashboard-date">
            <span>Hoje</span>
            <strong>{hoje}</strong>
          </div>
        </header>

        <section className="dashboard-quick-actions">
          <button className="dash-btn primary">
            Novo agendamento
          </button>

          <button className="dash-btn">
            Ver agenda
          </button>

          {/* Link direto para a lista de pacientes */}
          <Link href="/pacientes" className="dash-btn">
            Pacientes
          </Link>
        </section>


        {/* CARDS RESUMO (por enquanto estáticos) */}
        <section className="dashboard-grid">
          <div className="dash-card">
            <h2>Consultas de hoje</h2>
            <p className="dash-number">12</p>
            <p className="dash-caption">Agendadas para o dia</p>
          </div>

          <div className="dash-card">
            <h2>Pacientes aguardando</h2>
            <p className="dash-number">5</p>
            <p className="dash-caption">Na recepção aguardando atendimento</p>
          </div>

          <div className="dash-card">
            <h2>Faltas</h2>
            <p className="dash-number">2</p>
            <p className="dash-caption">Consultas não comparecidas hoje</p>
          </div>

          <div className="dash-card">
            <h2>Próximo horário</h2>
            <p className="dash-number">14:30</p>
            <p className="dash-caption">Dr(a). Exemplo · Clínica Geral</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
