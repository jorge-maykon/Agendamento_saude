import { router, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Navbar() {
    const { props } = usePage<{ user?: { email?: string } }>();
    const userEmail = props.user?.email ?? 'Usuário';
    const [open, setOpen] = useState(false);

    function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="w-full bg-white shadow p-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Painel do Sistema</span>

            {/* Usuário (clicável com menu de sair) */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 border border-slate-300 rounded-full px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
                >
                    {/* Avatar com a inicial */}
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                        {userEmail.charAt(0).toUpperCase()}
                    </span>

                    {/* E-mail / nome do usuário */}
                    <span className="max-w-[150px] truncate">
                        {userEmail}
                    </span>
                </button>

                {/* Dropdown com opção de sair */}
                {open && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-md shadow-lg text-sm z-50">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-2 hover:bg-slate-100">
                            Sair
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
