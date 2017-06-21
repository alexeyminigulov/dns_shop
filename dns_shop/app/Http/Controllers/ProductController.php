<?php

namespace App\Http\Controllers;

use App\Category;
use App\ListValue;
use App\Manufacturer;
use App\Product;
use App\ProductCharacter;
use App\TypeProduct;
use App\Unit;
use App\Value;
use Illuminate\Http\Request;
use DB;

use App\Http\Requests;
use Illuminate\Support\Facades\Schema;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $semanticUrl)
    {
        $typeProduct = TypeProduct::where('semanticUrl', $semanticUrl)->first();
        $products = Product::where('type_product_id', $typeProduct->_id)
                            ->select([ 'id','name','description','price','backup_amount' ])
                            ->paginate(3);
        $products = Product::getLogotype($products);

        // For Ajax request
        if( $request->has('page') && is_numeric($request['page']) && ($request->headers->get('Accept') == "*/*") ) {
            return response()->json($products);
        }

        $categories = Category::getTreeCategories();
        $catalog = Category::getSubCategory(Category::where('table_id', $typeProduct->_id)->first()->semanticUrl, $categories);
        $slider = [ 'min' => DB::table('products')->min('price'), 'max' => DB::table('products')->max('price') ];
        $listValue = ListValue::all();
        $brands = Manufacturer::all();


        return view('products', ['products' => $products, 'categories' => $categories,
            'slider' => $slider, 'typeProduct' => $typeProduct, 'listValue' => $listValue,
            'semanticUrl' => $semanticUrl, 'catalog' => $catalog, 'brands' => $brands]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try
        {
            $product = Product::select([ 'id','name','description','price','manufacturer_id','type_product_id','backup_amount' ])
                                ->findOrFail($id);
            $product->productCharacter = ProductCharacter::where('product_id', intval($id))->first();
            $product->manufacturer = $product->manufacturer;
            $typeProduct = $product->typeProduct;
            $typeProduct->fields = TypeProduct::updateFieldType($typeProduct->fields);

            // Жадная загрузка
//            if($typeProduct) {
//                $typeProduct->load('list_values', 'values');
//            }

            $categories = Category::getTreeCategories();
            $catalog = Category::getSubCategory(Category::where('table_id', $typeProduct->_id)->first()->semanticUrl, $categories);

            return view('product', ['product' => $product, 'typeProduct' => $typeProduct, 'categories' => $categories, 'catalog' => $catalog, 'item' => 0]);
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function filter(Request $request, $semanticUrl)
    {
        $typeProduct = TypeProduct::where('semanticUrl', $semanticUrl)->first();
        $categories = Category::getTreeCategories();
        $catalog = Category::getSubCategory(Category::where('table_id', $typeProduct->_id)->first()->semanticUrl, $categories);
        $slider = [ 'min' => DB::table('products')->min('price'), 'max' => DB::table('products')->max('price') ];
        $listValue = ListValue::all();
        $brands = Manufacturer::all();
        $params = $request->all();

        /**
         * Получить товары по фильтру.
         *
         * @param  array  $params
         * @param  \Illuminate\Database\Eloquent\Model $typeProduct
         * @return \Illuminate\Support\Collection
         */
        function getQueryProducts($params, $typeProduct)
        {
            $filterFields = [];     // Значенея для полей из productCharacter->fields
            $products = Product::where('type_product_id', $typeProduct->_id);

            /**
             * Формирует запрос на товары и добавление в $filterFields необхадимые запросы.
             *
             * @param  array  $params
             * @param  array  &$filterFields
             * @param  \Illuminate\Support\Collection &$products
             * @param  \Illuminate\Support\Collection $typeProduct
             * @return void
             */
            function setQueryProduct($params, &$filterFields, &$products, $typeProduct) {
                foreach ($params as $key => $value) {
                    if( $key === 'price-min' && !empty($value) ) {
                        $products = $products->where('price', '>=', $value);
                    }
                    else if( $key === 'price-max' && !empty($value) ) {
                        $products = $products->where('price', '<=', $value);
                    }
                    else if( $key === 'brands' && !empty($value) ) {
                        $products = $products->whereIn('manufacturer_id', $value);
                    }
                    // Выдергиваем динамические поля для таблицы product_character
                    else if( is_numeric($key) && array_key_exists($key, $typeProduct->fields) ) {
                        if(is_array($value)) {
                            foreach ($value as &$v) {
                                $v = is_numeric($v) ? intval($v) : $v;
                                if( empty($value) ) {
                                    $value = null;
                                    break;
                                }
                            }
                            unset($v);
                        }
                        if($value) $filterFields[$key] = $value;
                    }
                }
                if($value) unset($value);
            }
            setQueryProduct($params, $filterFields, $products, $typeProduct);

            $products = $products->get();

            /**
             * Обновление товаров в соответсвие с запросом на ProductCharacter.
             *
             * @param  array  &$filterFields
             * @param  \Illuminate\Support\Collection $products
             * @return \Illuminate\Support\Collection
             */
            function updateByProductCharacter($filterFields, $products)
            {
                foreach ($products as $item => &$product) {
                    // задаем запросы для динамических полей
                    $product->productCharacter = $product->productCharacter();
                    foreach ($filterFields as $key => $values) {
                        $product->productCharacter = $product->productCharacter->whereIn("fields.$key", $values);
                    }
                    $product->productCharacter = $product->productCharacter->first();
                    // Удаляем данный товар из коллекции если для динамических полей ни чего не найдено
                    if($product->productCharacter == null) {
                        $products->splice($item);
                    } else {
                        $product->logotype = $product->productCharacter->images[0];
                    }
                }
                unset($product);

                return $products;
            }
            $products = updateByProductCharacter($filterFields, $products);

            return $products;
        }
        $products = getQueryProducts($params, $typeProduct);

        return view('products', ['products' => $products, 'categories' => $categories,
            'slider' => $slider, 'typeProduct' => $typeProduct, 'listValue' => $listValue,
            'semanticUrl' => $semanticUrl, 'catalog' => $catalog, 'brands' => $brands]);
    }


    public function search(Request $request, $semanticUrl = null)
    {
        $q = $request->input('q', '');
        if( empty($q) ) return;
        if($semanticUrl) {
            $typeProduct = TypeProduct::where('semanticUrl', $semanticUrl)->first();
            $idTP = $typeProduct->_id;
            $products = Product::where('type_product_id', $idTP)->where('name', 'like', $q.'%')->limit(10);
        }
        else {
            $products = Product::where('name', 'like', $q.'%')->limit(10);
        }
        $products = $products->get();

        return response()->json([ "products" => $products, "q" => $q, "semanticUrl" => $semanticUrl ]);
    }
}
