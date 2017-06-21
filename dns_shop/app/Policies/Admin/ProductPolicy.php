<?php

namespace App\Policies\Admin;

use App\User;
use App\Product;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function show(User $user, Product $product)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'product.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, Product $product)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'product.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function update(User $user, Product $product)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'product.update' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, Product $product)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'product.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
