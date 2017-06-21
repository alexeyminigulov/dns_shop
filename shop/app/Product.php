<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\HybridRelations;
// use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    
    use HybridRelations;

	protected $connection = 'mysql';


	protected $fillable = [
        'name', 'description', 'price', 'amount', 'backup_amount', 'type_product_id', 'manufacturer_id',
    ];

	public function productCharacter()
    {
        return $this->hasOne('App\ProductCharacter', 'product_id', 'id');
    }

    public function manufacturer()
    {
    	return $this->belongsTo('App\Manufacturer', 'manufacturer_id', 'id');
    }

    public function typeProduct()
    {
        return $this->belongsTo('App\TypeProduct', 'type_product_id', '_id');
    }

    /**
     * Привязать к товарам свойство logotype.
     *
     * @param  \Illuminate\Support\Collection  $products
     * @return \Illuminate\Support\Collection
     */
    public static function getLogotype($products) {

        foreach ($products as &$product) {
            $product->logotype = $product->productCharacter->images[0];
        }
        unset($product);

        return $products;
    }
}
