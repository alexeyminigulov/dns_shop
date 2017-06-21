<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'IndexController@index')->name('welcome');

Route::get('/product/{id}', ['uses' => 'ProductController@show', 'as' => 'product.show']);

Route::get('/products/search', ['uses' => 'ProductController@search', 'as' => 'products.search']);

Route::get('/products/{semanticUrl}', ['uses' => 'ProductController@index', 'as' => 'products']);

Route::get('/products/{semanticUrl}/filter', ['uses' => 'ProductController@filter', 'as' => 'products.filter']);

Route::get('/products/{semanticUrl}/search', ['uses' => 'ProductController@search', 'as' => 'products.search']);

Route::get('/catalog/{semanticUrl}', ['uses' => 'CategoryController@index', 'as' => 'catalog']);

Route::get('/cart', ['uses' => 'CartController@index', 'as' => 'usr-cart']);

Route::get('/news/{id}', ['uses' => 'NewsController@show', 'as' => 'news-item']);

Route::get('/news', ['uses' => 'NewsController@index', 'as' => 'news-list']);

Route::get('/order', ['middleware' => ['auth'], 'uses' => 'OrderController@index', 'as' => 'order']);
Route::post('/order', ['middleware' => ['auth'], 'uses' => 'OrderController@store', 'as' => 'send-order']);
Route::get('/success-order', ['middleware' => ['auth'], 'uses' => 'OrderController@success', 'as' => 'success-order']);

Route::auth();

Route::get('user/activation/{token}', 'Auth\AuthController@activateUser')->name('user.activate');

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'admin']], function() {

	Route::get('/', ['uses' => 'Admin\IndexController@index', 'as' => 'enter.admin.panel']);

	Route::get('dashboard/statistics', 'Admin\IndexController@getStatistics');

	Route::resource('units', 'Admin\UnitsController');

	Route::resource('lists-values', 'Admin\ListsValuesController');
	Route::resource('values', 'Admin\ValuesController');

	Route::post('categories/{_id}', 'Admin\CategoriesController@update');
	Route::resource('categories', 'Admin\CategoriesController');

	Route::post('type-products/{_id}', 'Admin\TypeProductsController@update');
	Route::resource('type-products', 'Admin\TypeProductsController');

	Route::get('products/search/{params}', 'Admin\ProductsController@search');
	Route::get('products/search-ajax/{params}', 'Admin\ProductsController@searchProducts');
	Route::get('products/{productUrl}', 'Admin\ProductsController@index');
	Route::post('products/{productUrl}', 'Admin\ProductsController@store');
	Route::post('products/{productUrl}/{id}', 'Admin\ProductsController@update');
	Route::delete('products/{id}', 'Admin\ProductsController@destroy');


	Route::get('supply', 'Admin\SupplyController@index');
	Route::get('supply/{id}', 'Admin\SupplyController@indexById');
	Route::post('supply', 'Admin\SupplyController@store');


	Route::get('request', 'Admin\RequestController@index');
	Route::get('request/{id}', 'Admin\RequestController@indexById');
	Route::post('request/{id}', 'Admin\RequestController@store');


	Route::get('user', 'Admin\UserController@index');
	Route::get('users', 'Admin\UserController@getAll');
	Route::post('user/{id}', 'Admin\UserController@store');
	Route::post('users', 'Admin\UserController@editUser');

	Route::get('roles', 'Admin\UserController@getRoles');

	Route::get('news', 'Admin\NewsController@index');
	Route::get('news/search/title/{title}', 'Admin\NewsController@search');
	Route::post('news', 'Admin\NewsController@store');
	Route::get('news/{id}', 'Admin\NewsController@show');
	Route::post('news/{id}', 'Admin\NewsController@update');
	Route::delete('news/{id}', 'Admin\NewsController@destroy');


	Route::get('manufacturer', 'Admin\ManufacturerController@index');
	Route::post('manufacturer', 'Admin\ManufacturerController@store');
	Route::delete('manufacturer/{id}', 'Admin\ManufacturerController@destroy');
	Route::post('manufacturer/edit/{id}', 'Admin\ManufacturerController@update');

});