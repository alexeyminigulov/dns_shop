<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class ProductCharacter extends Eloquent {

    protected $connection = 'mongodb';

    protected $table = 'product_character';

    protected $guarded = [
    	'_id', 'product_id',			// нельзя не использовать $guarded совместно с $fillable
    ];

    public function product()
    {
        return $this->belongsTo('App\Product');
    }

}