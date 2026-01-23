<?php

use App\Models\Paciente;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Servico;
use App\Models\Agendamento;
use Carbon\Carbon;

use App\Http\Controllers\AgendamentoController;

Route::post('/agendamentos', function (Request $request) {
    dd('CHEGOU AQUI');
});

Route::delete('/agendamentos/{agendamento}', [AgendamentoController::class, 'destroy'])
    ->name('agendamentos.destroy');


Route::get('/', function () {
    return redirect()->route('login'); // se preferir login, troque para 'login'
});

//Editar agendamento 
Route::get('/agendamentos/{agendamento}/edit', [AgendamentoController::class, 'edit'])
    ->name('agendamentos.edit');

Route::put('/agendamentos/{agendamento}', [AgendamentoController::class, 'update'])
    ->name('agendamentos.update');


// Tela de login (GET)
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Processar login (POST)
Route::post('/login', function (Request $request) {
    // Guarda o e-mail na sessão (login simples por enquanto)
    $request->session()->put('user_email', $request->input('email'));

    return redirect()->route('dashboard');
})->name('login.perform');

// Logout (POST)
Route::post('/logout', function (Request $request) {
    $request->session()->flush();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect()->route('login');
})->name('logout');

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// AGENDA / CALENDÁRIO
Route::get('/agenda', function () {
    $agendamentos = Agendamento::with(['paciente', 'servicos'])->get();

    return Inertia::render('Agendamentos/Calendar', [
        'agendamentos' => $agendamentos,
    ]);
});


// LISTA DE PACIENTES
Route::get('/pacientes', function () {
    $pacientes = Paciente::orderBy('nome')->paginate(10); // 10 por página

    return Inertia::render('Pacientes/Index', [
        'pacientes' => $pacientes,
    ]);
})->name('pacientes.index');

// FORMULÁRIO DE NOVO PACIENTE
Route::get('/pacientes/novo', function () {
    return Inertia::render('Pacientes/Create');
})->name('pacientes.create');

// SALVAR NOVO PACIENTE (CADASTRO)
Route::post('/pacientes', function (Request $request) {
    $dados = $request->validate([
        'nome'      => ['required', 'string', 'max:255'],
        'telefone'  => ['nullable', 'string', 'max:50'],
        'documento' => ['nullable', 'string', 'max:50'],
    ]);

    Paciente::create($dados);

    return redirect()->route('pacientes.index');
})->name('pacientes.store');

// EDITAR PACIENTE (form)
Route::get('/pacientes/{paciente}/editar', function (Paciente $paciente) {
    return Inertia::render('Pacientes/Edit', [
        'paciente' => $paciente,
    ]);
})->name('pacientes.edit');

// ATUALIZAR PACIENTE
Route::put('/pacientes/{paciente}', function (Request $request, Paciente $paciente) {
    $dados = $request->validate([
        'nome'      => ['required', 'string', 'max:255'],
        'telefone'  => ['nullable', 'string', 'max:50'],
        'documento' => ['nullable', 'string', 'max:50'],
    ]);

    $paciente->update($dados);

    return redirect()->route('pacientes.index');
})->name('pacientes.update');

// EXCLUIR PACIENTE
Route::delete('/pacientes/{paciente}', function (Paciente $paciente) {
    $paciente->delete();

    return redirect()->route('pacientes.index');
})->name('pacientes.destroy');

//TELA DE SERVIÇO
// =====================
// SERVIÇOS
// =====================

// LISTA DE SERVIÇOS
Route::get('/servicos', function () {
    $servicos = Servico::orderBy('nome')
        ->paginate(10)          // 10 por página (pode mudar)
        ->withQueryString();    // mantém query string na navegação

    return Inertia::render('Servicos/Index', [
        'servicos' => $servicos,
    ]);
})->name('servicos.index');

// FORMULÁRIO DE NOVO SERVIÇO (GET)
Route::get('/servicos/novo', function () {
    return Inertia::render('Servicos/Create');
})->name('servicos.create');

// SALVAR NOVO SERVIÇO (POST)
Route::post('/servicos', function (Request $request) {
    $dados = $request->validate([
        'nome'            => ['required', 'string', 'max:255'],
        'descricao'       => ['nullable', 'string'],
        'preco'           => ['required', 'numeric', 'min:0'],
        'duracao_minutos' => ['nullable', 'integer', 'min:1'],
    ]);

    Servico::create($dados);

    return redirect()->route('servicos.index');
})->name('servicos.store');

// EDITAR SERVIÇO (form)
Route::get('/servicos/{servico}/editar', function (Servico $servico) {
    return Inertia::render('Servicos/Edit', [
        'servico' => $servico,
    ]);
})->name('servicos.edit');

// ATUALIZAR SERVIÇO
Route::put('/servicos/{servico}', function (Request $request, Servico $servico) {
    $dados = $request->validate([
        'nome'            => ['required', 'string', 'max:255'],
        'descricao'       => ['nullable', 'string'],
        'preco'           => ['required', 'numeric', 'min:0'],
        'duracao_minutos' => ['nullable', 'integer', 'min:1'],
    ]);

    $servico->update($dados);

    return redirect()->route('servicos.index');
})->name('servicos.update');

// EXCLUIR SERVIÇO
Route::delete('/servicos/{servico}', function (Servico $servico) {
    $servico->delete();

    return redirect()->route('servicos.index');
})->name('servicos.destroy');

// =====================
// AGENDAMENTOS
// =====================

// LISTA DE AGENDAMENTOS
Route::get('/agendamentos', function () {
    $agendamentos = Agendamento::with(['paciente', 'servicos'])
        ->orderBy('data')
        ->orderBy('hora_inicio')
        ->get();

    return Inertia::render('Agendamentos/Index', [
        'agendamentos' => $agendamentos,
    ]);
})->name('agendamentos.index');


// FORMULÁRIO DE NOVO AGENDAMENTO
Route::get('/agendamentos/novo', function () {
    return Inertia::render('Agendamentos/Create', [
        'pacientes' => Paciente::orderBy('nome')->get(['id', 'nome']),
        'servicos' => Servico::orderBy('nome')->get(['id', 'nome', 'duracao_minutos']),
    ]);
})->name('atendimentos.create');



// SALVAR NOVO AGENDAMENTO
Route::post('/agendamentos', function (Request $request) {

    $dados = $request->validate([
        'paciente_id' => ['required', 'exists:pacientes,id'],
        'data'        => ['required', 'date'],
        'hora_inicio' => ['required', 'date_format:H:i'],
        'servicos'    => ['required', 'array'],
        'servicos.*'  => ['exists:servicos,id'],
        'observacao'  => ['nullable', 'string'],
    ]);

    // 🔹 calcular duração total
    $duracaoTotal = Servico::whereIn('id', $dados['servicos'])
        ->sum('duracao_minutos');

    $horaInicio = Carbon::createFromFormat('H:i', $dados['hora_inicio']);
    $horaFim = $horaInicio->copy()->addMinutes($duracaoTotal);

    $agendamento = Agendamento::create([
        'paciente_id' => $dados['paciente_id'],
        'data'        => $dados['data'],
        'hora_inicio' => $horaInicio->format('H:i'),
        'hora_fim'    => $horaFim->format('H:i'),
        'status'      => 'agendado',
        'observacao'  => $dados['observacao'] ?? null,
    ]);

    //Exclusão de agendamentos
Route::delete('/agendamentos/{agendamento}', function (Agendamento $agendamento) {
    $agendamento->delete();

    return redirect()->back()->with('success', 'Agendamento excluído');
})->name('agendamentos.destroy');


    // 🔥 pivot
    $agendamento->servicos()->attach($dados['servicos']);

    return redirect()->route('agenda.index');
});