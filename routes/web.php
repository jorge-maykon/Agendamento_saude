<?php

use App\models\Paciente;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Rota raiz – pode mandar pra login ou dashboard
Route::get('/', function () {
    return redirect()->route('dashboard'); // se preferir login, troque para 'login'
});

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

// LISTA DE PACIENTES – banco
Route::get('/pacientes', function () {
    $pacientes = Paciente::orderBy('nome')->get();

    return Inertia::render('Pacientes/Index', [
        'pacientes' => $pacientes,
    ]);
})->name('pacientes.index');

// FORMULÁRIO DE NOVO PACIENTE (a gente monta depois)
Route::get('/pacientes/novo', function () {
    return Inertia::render('Pacientes/Create');
})->name('pacientes.create');

// EDITAR PACIENTE – carrega dados do banco
Route::get('/pacientes/{paciente}/editar', function (Paciente $paciente) {
    return Inertia::render('Pacientes/Edit', [
        'paciente' => $paciente,
    ]);
})->name('pacientes.edit');

// ATUALIZAR PACIENTE (recebe o PUT da tela de edição)
Route::put('/pacientes/{paciente}', function (Request $request, Paciente $paciente) {
    $dados = $request->validate([
        'nome'      => ['required', 'string', 'max:255'],
        'telefone'  => ['nullable', 'string', 'max:50'],
        'documento' => ['nullable', 'string', 'max:50'],
    ]);

    $paciente->update($dados);

    return redirect()->route('pacientes.index');
})->name('pacientes.update');


