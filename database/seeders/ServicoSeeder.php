<?php

namespace Database\Seeders;

use App\Models\Servico;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Servico::truncate(); // limpa a tabela antes de popular (cuidado em produção)

        Servico::create([
            'nome'            => 'Consulta geral',
            'descricao'       => 'Avaliação clínica inicial do paciente.',
            'preco'           => 150.00,
            'duracao_minutos' => 30,
        ]);

        Servico::create([
            'nome'            => 'Retorno',
            'descricao'       => 'Consulta de acompanhamento após atendimento inicial.',
            'preco'           => 80.00,
            'duracao_minutos' => 20,
        ]);

        Servico::create([
            'nome'            => 'Limpeza',
            'descricao'       => 'Procedimento de profilaxia e limpeza básica.',
            'preco'           => 220.00,
            'duracao_minutos' => 45,
        ]);

        Servico::create([
            'nome'            => 'Avaliação especializada',
            'descricao'       => 'Avaliação com profissional especializado.',
            'preco'           => 250.00,
            'duracao_minutos' => 40,
        ]);
    }
}
