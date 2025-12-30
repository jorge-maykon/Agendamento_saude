<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Servico extends Model
{
   use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'preco',
        'duracao_minutos',
    ];

    // app/Models/Servico.php

public function agendamentos()
{
    return $this->hasMany(Agendamento::class);
}


}


