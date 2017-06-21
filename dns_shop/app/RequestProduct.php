<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestProduct extends Model
{
    protected $connection = 'mysql';

    protected $table = 'product_request';

    protected $fillable = [
        'product_id',
        'amount',
    ];

    public function product()
    {
        return $this->belongsTo('App\Product', 'product_id', 'id');
    }
}
