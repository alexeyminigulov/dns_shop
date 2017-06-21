<?php

namespace App\Policies\Admin;

use App\User;
use App\TypeProduct;
use Illuminate\Auth\Access\HandlesAuthorization;

class TypeProductPolicy
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

    public function index(User $user, TypeProduct $tp)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'typeproducts.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, TypeProduct $typeProduct)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'typeproduct.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function update(User $user, TypeProduct $typeProduct)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'typeproduct.update' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, TypeProduct $typeProduct)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'typeproduct.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
