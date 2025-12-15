<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

public function run(): void
{
    $this->call([
        ServicoSeeder::class,
        // PacienteSeeder::class, etc...
    ]);
}

