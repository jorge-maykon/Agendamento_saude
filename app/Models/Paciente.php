<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
    protected $fillable = [
        'nome',
        'telefone',
        'documento',
    ];

    public function agendamentos()
    {
        return $this->hasMany(Agendamento::class);
    }
}
