<?php

namespace App\Policies\Admin;

use App\User;
use App\Value;
use Illuminate\Auth\Access\HandlesAuthorization;

class ValuePolicy
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

    public function store(User $user, Value $value)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'value.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, Value $value)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'value.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
