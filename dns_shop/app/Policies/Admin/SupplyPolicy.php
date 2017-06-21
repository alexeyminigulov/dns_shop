<?php

namespace App\Policies\Admin;

use App\User;
use App\Supply;
use Illuminate\Auth\Access\HandlesAuthorization;

class SupplyPolicy
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

    public function index(User $user, Supply $supply)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'supplies.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function indexById(User $user, Supply $supply)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'supply.show' )
            {
                return true;
            }
        }
        return false;
    }
}
