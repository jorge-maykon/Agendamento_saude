<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Agendamento.php
class Agendamento extends Model
{
    protected $fillable = [
        'paciente_id',
        'servico_id',
        'data',
        'hora_inicio',
        'duracao_minutos',
        'status',
        'observacoes',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function servico()
    {
        return $this->belongsTo(Servico::class);
    }
}

