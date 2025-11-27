<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');


Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// Se quiser que a raiz do sistema já vá para o login:
Route::get('/', function () {
    return redirect()->route('login');
});
