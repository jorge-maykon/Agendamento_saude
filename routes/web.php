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

// LISTA DE PACIENTES – agora vindo do banco
Route::get('/pacientes', function () {
    $pacientes = Paciente::orderBy('nome')->get();

    return Inertia::render('Pacientes/Index', [
        'pacientes' => $pacientes,
    ]);
});

// FORMULÁRIO DE NOVO PACIENTE
Route::get('/pacientes/novo', function () {
    return Inertia::render('Pacientes/Create');
});

// EDITAR PACIENTE
Route::get('/pacientes/{id}/editar', function ($id) {
    $paciente = Paciente::findOrFail($id);

    return Inertia::render('Pacientes/Edit', [
        'paciente' => $paciente,
    ]);
});


