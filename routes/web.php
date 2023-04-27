<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
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
    return view('dashboard.product.index');
});

Route::get('/dashboard', function () {
    //return view('dashboard');
    return view('dashboard.product.index');
});

/* Product Controller*/
Route::get('/dashboard/product/create/', [ProductController::class,'create'])->name('product.create');
Route::get('/dashboard/product/show/{id}', [ProductController::class, 'show'])->name('product.show');
Route::post('/dashboard/product', [ProductController::class, 'store'])->name('product.store');
Route::get('/dashboard/product/{id}/edit/', [ProductController::class, 'edit'])->name('product.edit');
Route::put('/dashboard/product/{id}', [ProductController::class, 'update'])->name('product.update');
Route::delete('/dashboard/product/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::get('/dashboard/product/index/', [ProductController::class,'index'])->name('product.index');

