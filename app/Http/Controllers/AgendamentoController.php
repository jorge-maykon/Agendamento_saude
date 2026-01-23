<?php

namespace App\Http\Controllers;

use App\Models\Agendamento; // 👈 ESSENCIAL
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendamentoController extends Controller
{
    public function destroy(Agendamento $agendamento)
    {
        $agendamento->delete();
        return redirect()->back();
    }

    public function edit(Agendamento $agendamento)
    {
        $agendamento->load(['paciente', 'servicos']);

        return Inertia::render('Agendamentos/Edit', [
            'agendamento' => $agendamento,
        ]);
    }

    public function update(Request $request, Agendamento $agendamento)
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'hora_inicio' => 'required',
            'hora_fim' => 'required',
            'observacao' => 'nullable|string',
            'servicos' => 'array',
        ]);

        // Atualiza campos simples
        $agendamento->update([
            'data' => $validated['data'],
            'hora_inicio' => $validated['hora_inicio'],
            'hora_fim' => $validated['hora_fim'],
            'observacao' => $validated['observacao'] ?? null,
        ]);

        // Atualiza serviços (pivot)
        if (isset($validated['servicos'])) {
            $agendamento->servicos()->sync($validated['servicos']);
        }

        // 👇 ESSENCIAL PARA MODAL
        return redirect()->back();
    }


}

