import React from 'react';
import { Link } from '@inertiajs/react';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [collapsed, setCollapsed] = React.useState(false);

  // opcional: lembrar no navegador
  React.useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved) setCollapsed(saved === '1');
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sidebar_collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside
        className={[
          "bg-slate-900 text-white h-screen sticky top-0 transition-all duration-200",
          collapsed ? "w-16" : "w-64",
        ].join(" ")}
      >
        {/* TOPO DA SIDEBAR */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-slate-700" />
            {!collapsed && <span className="font-semibold">Agendamento</span>}
          </div>

          <button
            type="button"
            onClick={() => setCollapsed(v => !v)}
            className="p-2 rounded hover:bg-slate-800"
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            title={collapsed ? "Expandir" : "Recolher"}
          >
            {/* ícone simples */}
            <span className="text-lg">{collapsed ? "»" : "«"}</span>
          </button>
        </div>

        {/* MENU */}
        <nav className="px-2 py-3 space-y-1">
          <MenuItem href="/dashboard" icon="🏠" label="Dashboard" collapsed={collapsed} />
          <MenuItem href="/pacientes" icon="👤" label="Pacientes" collapsed={collapsed} />
          <MenuItem href="/servicos" icon="🧰" label="Serviços" collapsed={collapsed} />
          <MenuItem href="/agendamentos" icon="📅" label="Agendamentos" collapsed={collapsed} />
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 min-w-0">
        {/* Topbar (se quiser) */}
        <div className="h-14 bg-white border-b border-slate-200 flex items-center px-4">
          <span className="text-slate-700">Painel</span>
        </div>

        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

function MenuItem({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: string;
  label: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800 transition"
    >
      <span className="w-6 text-center">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}