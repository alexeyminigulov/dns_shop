<?php

namespace App\Policies\Admin;

use App\User;
use App\RequestUser;
use Illuminate\Auth\Access\HandlesAuthorization;

class RequestUserPolicy
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

    public function index(User $user, RequestUser $requestUser)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'requests.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function indexById(User $user, RequestUser $requestUser)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'request.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, RequestUser $requestUser)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'request.store' )
            {
                return true;
            }
        }
        return false;
    }
}
