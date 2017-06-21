<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
//            [
//                'name' => 'iPhone1',
//                'manufacturer_id' => 1,
//                'description' => 'secret1',
//                'price' => 15000,
//                'type_product_id' => '580cee19c4ca6f140f000029',
//            ],
//            [
//                'name' => 'iPhone2',
//                'manufacturer_id' => 1,
//                'description' => 'secret2',
//                'price' => 20000,
//                'type_product_id' => '580cee19c4ca6f140f000029',
//            ],
//            [
//                'name' => 'iPhone3',
//                'manufacturer_id' => 1,
//                'description' => 'secret3',
//                'price' => 25000,
//                'type_product_id' => '58a93868c4ca6f5c11000029',
//            ],
        ]);
    }
}
