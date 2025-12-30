<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('agendamentos', function (Blueprint $table) {
        $table->id();

        // Ligações
        $table->unsignedBigInteger('paciente_id');
        $table->unsignedBigInteger('servico_id');

        // Data e horário
        $table->date('data');
        $table->time('hora_inicio');
        $table->time('hora_fim')->nullable();

        // Status do agendamento
        $table->string('status')->default('agendado'); // agendado, concluido, cancelado...

        // Observações adicionais
        $table->text('observacao')->nullable();

        $table->timestamps();

        // Se quiser as FKs (mesmo no sqlite funciona razoavelmente)
        $table->foreign('paciente_id')->references('id')->on('pacientes')->onDelete('cascade');
        $table->foreign('servico_id')->references('id')->on('servicos')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::dropIfExists('agendamentos');
}

};
