<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductSupplyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_supply', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('product_id')->unsigned()->default(1);
            //$table->foreign('product_id')->references('id')->on('products');

            $table->integer('supply_id')->unsigned()->default(1);
            //$table->foreign('supply_id')->references('id')->on('supplies');
            
            $table->integer('amount')->unsigned()->default(0);
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
        Schema::drop('product_supply');
    }
}
