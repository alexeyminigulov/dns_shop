<?php

use Illuminate\Database\Seeder;

class RequestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('requests')->insert([
//            [ 'user_id' => '1', 'status' => 'в обработке', ],
        ]);
    }
}
