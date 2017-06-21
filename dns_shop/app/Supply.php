<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Supply extends Model
{
    protected $connection = 'mysql';

    protected $table = 'supplies';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function supplyProducts()
    {
        return $this->hasMany('App\SupplyProduct', 'supply_id', 'id');
    }
}
