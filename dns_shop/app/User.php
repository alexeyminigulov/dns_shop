<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'login', 'password', 'email', 'role_id', 'first_name', 'last_name', 'birth_date', 'sex', 'photo',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function supplies()
    {
        return $this->hasMany('App\Supply', 'user_id', 'id');
    }

    public function role()
    {
        return $this->belongsTo('App\Role', 'role_id', 'id');
    }

    public function scopeGetPermissions($query)
    {
        return $this->role->permissions;
    }

    public function isAdmin() {

        return $this->role->name === 'admin';
    }
}
