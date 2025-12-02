<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PacienteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->name(),
            'telefone' => $this->faker->phoneNumber(),
            'documento' => $this->faker->numerify('###.###.###-##'), // se der erro no cpf, troque por ->randomNumber()
        ];
    }
}


//Se der erro troque documento... por 'documento' => $this->faker->numerify('###.###.###-##'),
