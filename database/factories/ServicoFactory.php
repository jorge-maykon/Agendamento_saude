<?php

namespace Database\Factories;

use App\Models\Servico;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServicoFactory extends Factory
{
    protected $model = Servico::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->randomElement([
                'Consulta Geral',
                'Consulta de Retorno',
                'Limpeza',
                'Exame de Rotina',
                'Avaliação Especializada',
            ]),
            'descricao' => $this->faker->sentence(8),
            'preco' => $this->faker->randomFloat(2, 50, 400), // 50 a 400
            'duracao_minutos' => $this->faker->randomElement([15, 30, 45, 60]),
        ];
    }
}
