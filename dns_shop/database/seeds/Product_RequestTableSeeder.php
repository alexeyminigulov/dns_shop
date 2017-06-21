<?php

use Illuminate\Database\Seeder;

class Product_RequestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_request')->insert([
//            [ 'product_id' => 1, 'request_id' => 1, 'amount' => 3 ],
//            [ 'product_id' => 2, 'request_id' => 1, 'amount' => 5 ],
        ]);
    }
}
