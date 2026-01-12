<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    protected $fillable = ['nome', 'preco', 'duracao_minutos'];

    public function agendamentos()
    {
        return $this->belongsToMany(Agendamento::class, 'agendamento_servico');
    }
}
