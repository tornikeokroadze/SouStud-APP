<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::get('/subject', [SubjectController::class, 'index']);
// Route::put('/subjects/{id}', [SubjectController::class, 'update'])->name('subject.update');
Route::put('/subjects/update', [SubjectController::class, 'update'])->name('subject.update');

