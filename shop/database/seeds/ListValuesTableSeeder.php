<?php

use Illuminate\Database\Seeder;

class ListValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('list_values')->insert([
//            'name' => 'HDD',
        ]);
    }
}
