<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servico;

class ServicoSeeder extends Seeder
{
    public function run(): void
    {
        // cria 20 serviços fake
        Servico::factory()->count(20)->create();
    }
}
