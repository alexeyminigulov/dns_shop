<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SupplyProduct extends Model
{
    protected $connection = 'mysql';

    protected $table = 'product_supply';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'product_id',
        'amount',
    ];

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id', 'id');
    }

    public function supply()
    {
        return $this->belongsTo('App\Supply', 'supply_id', 'id');
    }
}
