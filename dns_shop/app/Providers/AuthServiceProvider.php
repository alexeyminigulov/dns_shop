<?php

namespace App\Providers;

use App\News;
use App\Policies\Admin\NewsPolicy;
use App\Policies\Admin\RequestUserPolicy;
use App\Policies\Admin\SupplyPolicy;
use App\Policies\Admin\TypeProductPolicy;
use App\Policies\Admin\UserPolicy;
use App\Policies\Admin\ValuePolicy;
use App\RequestUser;
use App\Category;
use App\ListValue;
use App\Policies\Admin\CategoryPolicy;
use App\Policies\Admin\ListValuePolicy;
use App\Policies\Admin\ProductPolicy;
use App\Product;
use App\Supply;
use App\TypeProduct;
use App\User;
use App\Value;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Unit;
use App\Policies\Admin\UnitPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        //'App\Model' => 'App\Policies\ModelPolicy',
        Unit::class => UnitPolicy::class,
        Category::class => CategoryPolicy::class,
        ListValue::class => ListValuePolicy::class,
        Product::class => ProductPolicy::class,
        RequestUser::class => RequestUserPolicy::class,
        Supply::class => SupplyPolicy::class,
        TypeProduct::class => TypeProductPolicy::class,
        Value::class => ValuePolicy::class,
        News::class => NewsPolicy::class,
        User::class => UserPolicy::class,
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);
        //
    }
}
