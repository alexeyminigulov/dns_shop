<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            ['name' => 'admin', 'alias' => 'администратор'],
            ['name' => 'moderator', 'alias' => 'модератор'],
            ['name' => 'guest', 'alias' => 'гость']
        ]);
    }
}
