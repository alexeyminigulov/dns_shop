<?php

namespace App\Policies\Admin;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\User;
use App\Unit;

class UnitPolicy
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

    public function show(User $user, Unit $unit)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'unit.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, Unit $unit)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'unit.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, Unit $unit)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'unit.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
