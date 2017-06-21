<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ListValue extends Model
{
    protected $fillable = [
        'name',
    ];

    public function values()
    {
        return $this->hasMany('App\Value', 'list_value_id', 'id');
    }
}
