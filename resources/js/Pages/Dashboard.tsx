// resources/js/Pages/Dashboard.tsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import Layout from "@/Components/Layout";


export default function Dashboard() {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

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

        {/* AÇÕES RÁPIDAS */}
        <section className="dashboard-quick-actions">
          <button className="dash-btn primary">Novo agendamento</button>
          <button className="dash-btn">Ver agenda</button>
          <button className="dash-btn">Pacientes</button>
        </section>

        {/* CARDS RESUMO */}
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
