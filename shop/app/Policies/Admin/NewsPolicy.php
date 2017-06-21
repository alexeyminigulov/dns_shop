<?php

namespace App\Policies\Admin;

use App\News;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\User;

class NewsPolicy
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

    public function index(User $user, News $news)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'news.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function store(User $user, News $news)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'news.store' )
            {
                return true;
            }
        }
        return false;
    }

    public function show(User $user, News $news)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'newsItem.show' )
            {
                return true;
            }
        }
        return false;
    }

    public function update(User $user, News $news)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'news.update' )
            {
                return true;
            }
        }
        return false;
    }

    public function destroy(User $user, News $news)
    {
        foreach ( $user->getPermissions() as $permission )
        {
            if( $permission['name'] === 'news.destroy' )
            {
                return true;
            }
        }
        return false;
    }
}
