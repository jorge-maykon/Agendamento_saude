import { Link, usePage } from '@inertiajs/react';

type Servico = {
    id: number;
    nome: string;
    descricao?: string | null;
    preco: number;
    duracao_minutos?: number | null;
};

type PageProps = {
    servicos: Servico[];
};

export default function ServicosIndex() {
    const { props } = usePage<PageProps>();
    const servicos = props.servicos ?? [];

    return (
        <div className="p-6">
            {/* CABEÇALHO DA LISTA */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Serviços
                </h1>

                <Link
                    href="/servicos/novo"
                    className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                >
                    + Novo serviço
                </Link>
            </div>

            {/* AQUI FICA SUA TABELA DE SERVIÇOS */}
            {/* ... tabela usando 'servicos' ... */}
        </div>
    );
}
