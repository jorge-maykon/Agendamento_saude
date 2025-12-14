import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Components/Layout';

type Servico = {
    id: number;
    nome: string;
    preco: number;
    duracao: string;
};

type PageProps = {
    servicos: Servico[];
};

export default function Index() {
    const { props } = usePage<PageProps>();
    const servicos = props.servicos ?? [];

    return (
        <Layout title="Serviços">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Serviços
                </h1>

                <button
                    type="button"
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700 transition"
                >
                    Novo serviço
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 text-slate-500 font-medium">ID</th>
                            <th className="px-4 py-3 text-slate-500 font-medium">Nome</th>
                            <th className="px-4 py-3 text-slate-500 font-medium">Preço</th>
                            <th className="px-4 py-3 text-slate-500 font-medium">Duração</th>
                            <th className="px-4 py-3 text-slate-500 font-medium text-right">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((servico) => (
                            <tr
                                key={servico.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                <td className="px-4 py-2 text-slate-700">
                                    {servico.id}
                                </td>
                                <td className="px-4 py-2 text-slate-700">
                                    {servico.nome}
                                </td>
                                <td className="px-4 py-2 text-slate-700">
                                    R$ {servico.preco.toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-slate-700">
                                    {servico.duracao}
                                </td>
                                <td className="px-4 py-2 text-right space-x-2">
                                    <button
                                        type="button"
                                        className="text-emerald-700 text-xs hover:underline"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        className="text-red-600 text-xs hover:underline"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {servicos.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-slate-400 text-sm"
                                >
                                    Nenhum serviço cadastrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
