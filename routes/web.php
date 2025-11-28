<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

// Rota padrão: manda pro dashboard
Route::get('/', function () {
    return redirect()->route('dashboard');
});

// Tela de login (GET)
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Processar login (POST)
Route::post('/login', function (Request $request) {
    // Aqui só estamos “fingindo” login, salvando o e-mail na sessão
    $request->session()->put('user_email', $request->input('email'));

    return redirect()->route('dashboard');
})->name('login.perform');

// Logout (POST)
Route::post('/logout', function (Request $request) {
    // Limpa tudo da sessão
    $request->session()->flush();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    // Volta para a tela de login
    return redirect()->route('login');
})->name('logout');

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

// Lista de pacientes (Clientes)
Route::get('/clientes', function () {
    return Inertia::render('Clientes/Index');
})->name('clientes.index');

// Novo agendamento
Route::get('/agendamentos/novo', function () {
    return Inertia::render('Agendamentos/Create');
})->name('agendamentos.create');

// Agenda (calendário)
Route::get('/agenda', function () {
    return Inertia::render('Agendamentos/Calendar');
})->name('agenda.index');
