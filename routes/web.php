<?php

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

// LISTA DE PACIENTES
Route::get('/pacientes', function () {
    $pacientes = [
        [
            'id' => 1,
            'nome' => 'João Silva',
            'telefone' => '(61) 99999-0001',
            'documento' => '111.111.111-11',
        ],
        [
            'id' => 2,
            'nome' => 'Maria Souza',
            'telefone' => '(61) 98888-0002',
            'documento' => '222.222.222-22',
        ],
        [
            'id' => 3,
            'nome' => 'Carlos Pereira',
            'telefone' => '(61) 97777-0003',
            'documento' => '333.333.333-33',
        ],
    ];

    return Inertia::render('Pacientes/Index', [
        'pacientes' => $pacientes,
    ]);
});

// FORMULÁRIO DE NOVO PACIENTE
Route::get('/pacientes/novo', function () {
    return Inertia::render('Pacientes/Create');
});

