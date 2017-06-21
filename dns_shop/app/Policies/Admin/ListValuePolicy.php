<?php

namespace App\Policies\Admin;

use App\User;
use App\ListValue;
use Illuminate\Auth\Access\HandlesAuthorization;

class ListValuePolicy
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

    public function show(User $user, ListValue $listValue)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'listvalues.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, ListValue $listValue)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'listvalues.store' )
            {
                return true;
            }
        }
        return false;
    }
}
