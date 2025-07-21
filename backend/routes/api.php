<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DomaineController;

Route::middleware('api')->prefix('api')->group(function () {
    Route::get('/status', fn () => ['ok' => true]);
});


Route::post('/domains', [DomaineController::class, 'storeDomains']);
