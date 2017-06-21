<?php

use Illuminate\Database\Seeder;

class ValuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('values')->insert([
//            ['name' => '128 Mb'],
//            ['name' => '256 Mb'],
        ]);
    }
}
