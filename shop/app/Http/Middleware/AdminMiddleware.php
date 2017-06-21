<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        foreach ( Auth::user()->getPermissions() as $permission ) {
            if( $permission['name'] === 'enter.admin.panel' )
            {
                return $next($request);
            }
        }
        $view = view('errors.404');
        return response($view, 404);
    }
}
