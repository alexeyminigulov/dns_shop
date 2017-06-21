<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductRequestTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_request', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('product_id')->unsigned()->default(1);
            //$table->foreign('product_id')->references('id')->on('products');

            $table->integer('request_id')->unsigned()->default(1);
            //$table->foreign('request_id')->references('id')->on('requests');

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
        Schema::drop('product_request');
    }
}
