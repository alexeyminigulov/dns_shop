<?php

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            ['name' => 'enter.admin.panel'],    // 1
            ['name' => 'unit.store'],           // 2
            ['name' => 'unit.destroy'],         // 3
            ['name' => 'unit.show'],            // 4
            ['name' => 'categories.show'],      // 5
            ['name' => 'category.store'],       // 6
            ['name' => 'category.update'],      // 7
            ['name' => 'category.destroy'],     // 8
            ['name' => 'listvalues.show'],      // 9
            ['name' => 'listvalues.store'],     // 10
            ['name' => 'product.show'],         // 11
            ['name' => 'product.store'],        // 12
            ['name' => 'product.update'],       // 13
            ['name' => 'product.destroy'],      // 14
            ['name' => 'requests.show'],        // 15
            ['name' => 'request.show'],         // 16
            ['name' => 'request.store'],        // 17
            ['name' => 'supplies.show'],        // 18
            ['name' => 'supply.show'],          // 19
            ['name' => 'typeproduct.store'],    // 20
            ['name' => 'typeproducts.show'],    // 21
            ['name' => 'typeproduct.update'],   // 22
            ['name' => 'typeproduct.destroy'],  // 23
            ['name' => 'value.store'],          // 24
            ['name' => 'value.destroy'],        // 25
            ['name' => 'news.show'],            // 26
            ['name' => 'news.store'],           // 27
            ['name' => 'newsItem.show'],        // 28
            ['name' => 'news.update'],          // 29
            ['name' => 'news.destroy'],         // 30
            ['name' => 'users.show'],           // 31
            ['name' => 'users.update.role'],    // 32
        ]);
    }
}
