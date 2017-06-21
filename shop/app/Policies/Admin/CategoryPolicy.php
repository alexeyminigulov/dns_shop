<?php

namespace App\Policies\Admin;

use App\User;
use App\Category;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
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

    public function show(User $user, Category $category)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'categories.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, Category $category)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'category.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function update(User $user, Category $category)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'category.update' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, Category $category)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'category.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
