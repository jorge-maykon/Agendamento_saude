<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recorrencia extends Model
{
    protected $fillable = [
        'tipo',
        'intervalo',
        'data_inicio',
        'data_fim',
    ];

    public function agendamentos()
    {
        return $this->belongsToMany(Agendamento::class);
    }
}
