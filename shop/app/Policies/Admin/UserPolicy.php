<?php

namespace App\Policies\Admin;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
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

    public function getAll(User $user, User $usr)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'users.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function editUser(User $user, User $usr)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'users.update.role' )
            {
                return true;
            }
        }
        return false;
    }
}
