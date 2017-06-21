<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    protected $table = 'manufacturers';

    protected $fillable = [
        'name', 'logotype',
    ];

    public function products()
    {
        return $this->hasMany('App\Product', 'manufacturer_id', 'id');
    }
}
