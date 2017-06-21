<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $connection = 'mysql';

    public function permissions()
    {
        return $this->belongsToMany('App\Permission', 'permission_role', 'role_id', 'permission_id');
    }
}
