<?php

use Illuminate\Database\Seeder;

class Product_SupplyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_supply')->insert([
//            [ 'product_id' => 1, 'supply_id' => 1, 'amount' => 3 ],
//            [ 'product_id' => 2, 'supply_id' => 1, 'amount' => 5 ],
        ]);
    }
}
