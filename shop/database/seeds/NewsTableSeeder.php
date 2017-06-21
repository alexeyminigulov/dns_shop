<?php

use Illuminate\Database\Seeder;

class NewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('news')->insert([

//            ['title' => '«Игры разума» – смотри не опоздай!',
//             'picture' => '{ "min": "news-logo.jpg", "medium": "news-logo.jpg" }',
//             'content' => '«Игры разума» в самом разгаре: мы уже вовсю получаем заявки на участие с классными обзорами и верными решениями загадки.',],
//
//            ['title' => 'Скоро! Старт продаж игры Horizon: Zero Dawn!',
//             'picture' => '{ "min": "news-logo.jpg", "medium": "news-logo.jpg" }',
//             'content' => 'Новая эра человечества. В прекрасном постапокалиптическом мире, где природа завоевала руины забытых цивилизаций.',],

        ]);
    }
}
