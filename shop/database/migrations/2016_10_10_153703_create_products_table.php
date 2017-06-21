<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();

            $table->integer('manufacturer_id')->unsigned()->default(1);
            //$table->foreign('manufacturer_id')->references('id')->on('manufacturers');

            $table->string('description');
            $table->integer('price');
            $table->integer('amount')->unsigned()->default(0);
            $table->integer('backup_amount')->unsigned()->default(0);

            $table->string('type_product_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('products');
    }
}
