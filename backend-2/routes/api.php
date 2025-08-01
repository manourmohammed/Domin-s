<?php

use App\Http\Controllers\DomainController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/test", function (Request $request){
    return "hello";
});

Route::post('/domains', [DomainController::class, 'storeDomains']);
