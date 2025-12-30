<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ServicoSeeder::class,
            // PacienteSeeder::class,  // se já estiver usando também
        ]);
    }
}
