<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DomaineController;

Route::post('/domaines/store-full', [DomaineController::class, 'storeFull']);
