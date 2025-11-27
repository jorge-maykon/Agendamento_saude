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
    // Aqui você poderia validar email/senha, mas por enquanto
    // vamos só "fingir" que deu certo e mandar pro dashboard.

    // Se quiser, salva o email na sessão só pra ter um "usuário logado":
    $request->session()->put('user_email', $request->input('email'));

    return redirect()->route('dashboard');
})->name('login.perform');

// Dashboard inicial
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');
