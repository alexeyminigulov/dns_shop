<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestUser extends Model
{
    protected $connection = 'mysql';

    protected $table = 'requests';

    protected $fillable = [
        'status',
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function requestProducts()
    {
        return $this->hasMany('App\RequestProduct', 'request_id', 'id');
    }

    public function getPrice()
    {
        $products = $this->requestProducts;
        $price = 0;

        foreach ($products as $val) {
            $product = Product::findOrFail($val->product_id);
            $price += $product->price * $val->amount;
        }
        return $price;
    }
}
