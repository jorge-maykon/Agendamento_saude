import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Servico = {
    id: number;
    nome: string;
    descricao?: string | null;
    preco: number;
    duracao_minutos?: number | null;
    created_at?: string;
    updated_at?: string;
};

type PageProps = {
    servico: Servico;
};

export default function ServicoShow() {
    const { props } = usePage<PageProps>();
    const { servico } = props;

    // Formatadores simples
    const precoFormatado = `R$ ${servico.preco.toFixed(2)}`;
    const duracaoFormatada = servico.duracao_minutos
        ? `${servico.duracao_minutos} min`
        : 'Não informado';

    return (
        <Layout title={`Serviço · ${servico.nome}`}>
            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        Detalhes do serviço
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                        {servico.nome}
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href={route('servicos.edit', servico.id)}
                        className="inline-flex items-center rounded-md border border-emerald-600 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-50 transition"
                    >
                        Editar serviço
                    </Link>

                    <Link
                        href={route('servicos.index')}
                        className="inline-flex items-center rounded-md border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                    >
                        Voltar para a lista
                    </Link>
                </div>
            </div>

            {/* Cartão principal */}
            <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                {/* Informações principais */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h2 className="text-sm font-semibold text-slate-700 mb-4">
                        Informações gerais
                    </h2>

                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-400 w-32">Nome</dt>
                            <dd className="flex-1 text-slate-800">
                                {servico.nome}
                            </dd>
                        </div>

                        <div className="flex justify-between gap-4">
                            <dt className="text-slate-400 w-32">Descrição</dt>
                            <dd className="flex-1 text-slate-800">
                                {servico.descricao || 'Nenhuma descrição cadastrada.'}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Cartão lateral com resumo */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h2 className="text-sm font-semibold text-slate-700 mb-4">
                        Resumo
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Preço</span>
                            <span className="font-semibold text-emerald-700">
                                {precoFormatado}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-400">Duração</span>
                            <span className="text-slate-800">
                                {duracaoFormatada}
                            </span>
                        </div>

                        <hr className="my-3 border-slate-100" />

                        <p className="text-xs text-slate-400">
                            Use esta tela para consultar rapidamente os detalhes
                            do serviço antes de agendar um paciente ou ajustar o cadastro.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
