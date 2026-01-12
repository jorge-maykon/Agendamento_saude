<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
    protected $fillable = [
        'paciente_id',
        'data',
        'hora_inicio',
        'hora_fim',
        'status',
        'observacao',
    ];

    public function paciente()
    {
        return $this->belongsTo(Paciente::class);
    }

    public function servicos()
    {
        return $this->belongsToMany(Servico::class, 'agendamento_servico');
    }
}
