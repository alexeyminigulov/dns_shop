<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use DB;
use Illuminate\Support\ServiceProvider;
use App\Category;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
//        DB::listen(function ($query){
//            echo '<h4>'. $query->sql .'</h4>';
//        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
