<?php

namespace App\Http\Controllers\Admin;

use Auth;
use Gate;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\ProductCharacter;
use App\TypeProduct;
use App\Product;
use App\Value;
use App\Unit;
use File;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;
use Intervention\Image\Facades\Image;
use Mockery\CountValidator\Exception;

class ProductsController extends Controller
{
    private $maxWidthImg = 2500;
    private $maxHeightImg = 2500;
    private $minWidthImg = 1000;
    private $minHeightImg = 1000;
    private $productSize = [
        'max' => [ 'width' => null, 'height' => null ],
        'max_tablet' => [ 'width' => null, 'height' => null ],
        'medium' => [ 'width' => null, 'height' => null ],
        'min' => [ 'width' => null, 'height' => null ]
    ];
    private $proportion;



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($productUrl, Request $request)
    {
        $user = Auth::user();
        $product = new Product();
		$currentPage = intval( $request->input('\page', 1) );
        if( Gate::denies('show', $product) )
        {
            return abort(404);
        }
		
		\Illuminate\Pagination\Paginator::currentPageResolver(function() use ($currentPage) {
            return $currentPage;
        });

        $typeProduct = TypeProduct::where('semanticUrl', $productUrl)->first();
        if(!$typeProduct) {
            return abort(404);
        }
        $products = Product::where('type_product_id', $typeProduct['_id'])->simplePaginate(4);
        foreach ($products as $product) {

            $productCharacter = ProductCharacter::where('product_id', $product['id'])->first();
            $product['fields'] = $productCharacter['fields'];
            $product['images'] = $productCharacter['images'];
        }
        return response()->json( $products );
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
    public function store(Request $request, $productUrl)
    {
        $user = Auth::user();
        $product = new Product();
        if( Gate::denies('store', $product) )
        {
            return abort(404);
        }
        if( !$productUrl || !$request->has('name') || !$request->has("fields")
                || !$request->has('description') || !$request->has('price')
                || !$request->has('manufacturer_id')
                || !isset($request['images']) || !is_array($request['images']) ) {
            return abort(404);
        }
        try{
            $typeProduct = TypeProduct::where('semanticUrl', $productUrl)->first();
            if( !$typeProduct ) {
                throw new Exception("Does not exist typeProduct");
            }
            if( !is_numeric($request["manufacturer_id"]) ) {
                throw new Exception("Manufacturer_id not is_numeric");
            }

            $fields = $this->setFields($request);
            $images = $this->set_getImages($request);

            function createProduct($request, $typeProduct, $fields, $images) {
                $product = new Product;
                $product->name            = $request["name"];
                $product->amount          = 0;
                $product->description     = $request["description"];
                $product->price           = $request["price"];
                $product->type_product_id = $typeProduct->_id;
                $product->manufacturer_id = intval( $request["manufacturer_id"] );

                $productCharacter = new ProductCharacter([ 'fields' => $fields, 'images' => $images ]);
                $product->save();
                $product->productCharacter()->save($productCharacter);

                return $product;
            }
            $product = createProduct($request, $typeProduct, $fields, $images);
        }
        catch (\Exception $e) {
            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }

        return response()->json( ["status" => 200, "id" => $product->id, "images" => $images] );
//        return response()->json( ["images" => $images] );
//         echo '<pre>';
//         print_r( $images );
//         echo '</pre>';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $productUrl, $id)
    {
        $user = Auth::user();
        $product = new Product();
        if( Gate::denies('update', $product) )
        {
            return abort(404);
        }
        if( !$productUrl || !$request->has('name') || !$request->has("fields")
            || !$request->has('description') || !$request->has('price')
            || !$request->has('manufacturer_id') ) {
            return abort(404);
        }

        $status = 200;
        try {
            $product = Product::findOrFail($request["id"]);
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }

        $fields = $this->setFields($request);
        $images = $this->set_getImages($request);

        $product->name = $request["name"];
        $product->price = $request["price"];
        $product->description = $request["description"];
        $product->manufacturer_id = $request["manufacturer_id"];
        $product->type_product_id = $request["type_product_id"];

        $productCharacter = ProductCharacter::where('product_id', $product['id'])->first();

        if( !isset($request['imagesOld']) || !is_array($request['imagesOld']) )
            $imagesOld = [];
        else
        {
            $imagesOld = $request['imagesOld'];
            foreach ($imagesOld as &$val) {
                $val = json_decode( $val );
            }
            unset($val);
        }

        $image_compare_func = function($a, $b)
        {
            if( is_array($a) && is_object($b) )
            if ( (isset($b->medium)) && $a['medium'] == $b->medium) {
                return 0;
            }
            else if( is_array($b) && is_object($a) )
            if ( (isset($b['medium'])) && $a->medium == $b['medium']) {
                return 0;
            }
            else if( is_array($a) && is_array($b) )
            if ( (isset($a['medium'])) && $a['medium'] == $b['medium']) {
                return 0;
            }
            else if( is_object($a) && is_object($b) )
            if ( (isset($b->medium)) && $a->medium == $b->medium) {
                return 0;
            }
            return ($a > $b)? 1:-1;
        };
        $imagesDiff  = array_udiff($productCharacter->images, $imagesOld, $image_compare_func);

        $imagesValueDiff = $this->retrieveValues($imagesDiff);
//        print_r($imagesValueDiff);
        foreach ($imagesValueDiff as &$value)
        {
            File::delete( 'images/' . $value );
        }
        unset($value);

        $images = array_merge( $images, $imagesOld );

        $productCharacter->fields = $fields;
        $productCharacter->images = $images;

        $product->save();
        $productCharacter->save();

        return response()->json( ["status" => $status, "images" => $images] );

//        echo '<pre>';
//        var_dump( isset($request['images']) );
//        print_r( $request->all() );
//        echo '</pre>';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $product = new Product();
        if( Gate::denies('destroy', $product) )
        {
            return abort(404);
        }

        $id = intval($id);
        try{
            $status = 200;
            $product = Product::find($id);
            $product->delete();
            $productCharacter = ProductCharacter::where('product_id', $product['id'])->first();
            $images = $productCharacter->images;
            foreach ($images as &$img) {
                $img = (array) $img;
            }
            unset($img);
            $images = $this->retrieveValues($images);
            foreach ($images as &$value)
            {
                File::delete( 'images/' . $value );
            }
            unset($value);
            $productCharacter->delete();
        } 
        catch (Exception $e) {
            $status = 500;
        }
        finally {
            return response()->json( ["status" => $status] );
        }
    }

    /**
     * Search
     *
     * @param  string $params
     * @return \Illuminate\Http\Response
     */
    public function search($params)
    {
        parse_str($params, $output);
        if( !property_exists((object)$output, 'name') )
            return response()->json( ["No searched!"] );

        $resulte = Product::where('name', 'LIKE', '%'.$output["name"].'%')
                          ->take(4)
                          ->get();

        return response()->json( $resulte );
    }

    /**
     * SearchProducts
     *
     * @param  string $params
     * @return \Illuminate\Http\Response
     */
    public function searchProducts($params, Request $request)
    {
		$currentPage = intval( $request->input('\page', 1) );
        parse_str($params, $output);
        if( !property_exists((object)$output, 'name') )
            return response()->json( ["No searched!"] );
		
		\Illuminate\Pagination\Paginator::currentPageResolver(function() use ($currentPage) {
            return $currentPage;
        });

        $resulte = Product::where('type_product_id', $output["type_product_id"])
                            ->where('name', 'LIKE', '%'.$output["name"].'%')
                            ->simplePaginate(4);
        foreach ($resulte as $product) {

            $productCharacter = ProductCharacter::where('product_id', $product['id'])->first();
            $product['fields'] = $productCharacter['fields'];
            $product['images'] = $productCharacter['images'];
        }

        return response()->json( $resulte );
    }


    /**
     * Проверка изображения на корректность
     *
     * @param  File  &$file
     * @return boolean
     */
    private function checkImage(&$file) {

        $this->width = Image::make($file)->width();
        $this->height = Image::make($file)->height();

        if( !$file->isValid() or
            $this->width > $this->maxWidthImg or $this->height > $this->maxHeightImg or
            ($this->width < $this->minWidthImg and $this->height < $this->minHeightImg) )
            return false;

        if( ($this->width > $this->height)
            && (intval($this->productSize['medium']['width'] / ($this->width / $this->height)) >= Config::get('settings.products_img')['medium']['height']) ) {

            $this->proportion = $this->width / $this->height;
            $this->productSize['max']['width']  = Config::get('settings.products_img')['max']['width'];
            $this->productSize['max']['height'] = intval($this->productSize['max']['width'] / $this->proportion);

            $this->productSize['max_tablet']['width']  = Config::get('settings.products_img')['max_tablet']['width'];
            $this->productSize['max_tablet']['height'] = intval($this->productSize['max_tablet']['width'] / $this->proportion);

            $this->productSize['medium']['width']  = Config::get('settings.products_img')['medium']['width'];
            $this->productSize['medium']['height'] = intval($this->productSize['medium']['width'] / $this->proportion);

            $this->productSize['min']['width']  = Config::get('settings.products_img')['min']['width'];
            $this->productSize['min']['height'] = intval($this->productSize['min']['width'] / $this->proportion);

        } else {

            $this->proportion = $this->height/$this->width;
            $this->productSize['max']['height']  = Config::get('settings.products_img')['max']['height'];
            $this->productSize['max']['width'] = intval($this->productSize['max']['height'] / $this->proportion);

            $this->productSize['max_tablet']['height']  = Config::get('settings.products_img')['max_tablet']['height'];
            $this->productSize['max_tablet']['width'] = intval($this->productSize['max_tablet']['height'] / $this->proportion);

            $this->productSize['medium']['height']  = Config::get('settings.products_img')['medium']['height'];
            $this->productSize['medium']['width'] = intval($this->productSize['medium']['height'] / $this->proportion);

            $this->productSize['min']['height']  = Config::get('settings.products_img')['min']['height'];
            $this->productSize['min']['width'] = intval($this->productSize['min']['height'] / $this->proportion);
        }

        return true;
    }

    /**
     * Извлекает значение аттрибутов
     *
     * @param  array  $arr
     * @return array
     */
    private function retrieveValues($arr) {
        static $values = [];

        if(is_array($arr)) {

            foreach ($arr as $val)
                $this->retrieveValues($val);

        } else {

            $values[] = $arr;
        }
        return $values;
    }

    /**
     * Задает водянные знаки для изображения
     *
     * @param  File &$imageFile
     * @return void
     */
    private function setWatemark(&$imageFile) {
        $watermark = Image::make( public_path('images/mask.png') );
        $x = 0;
        $oppacity = 40;
        while ($x < $imageFile->width()) {
            $y = 0;
            while($y < $imageFile->height()) {
                $imageFile->insert(public_path('images/mask.png'), 'top-left', $x, $y);
                $y += $watermark->height()+$oppacity;
            }
            $x += $watermark->width()+$oppacity;
        }
    }

    /**
     * Извлекает значение полей ProductCharacter
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    private function setFields($request)
    {
        $fields = explode( ',', $request["fields"] );
        foreach ($fields as &$value)
        {
            if( is_numeric($value) )
                $value = intval( $value );
        }
        unset($value);

        return $fields;
    }

    /**
     * Сохранение изображений в хранилище, и получение их названий
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    private function set_getImages($request)
    {
        $images = [];
        if( isset($request['images']) && is_array($request['images']) ) {
            foreach ($request['images'] as $key => $value) {
                if (!$request->hasFile('images.' . $key)) {
                    throw new Exception("Absent an image file!");
                }
                $file = $request->file('images.' . $key);

                if (!$this->checkImage($file)) {
                    throw new Exception("Изображение не корректно!");
                }
                $fileName = [
                    "max" => time() . '_max.' . $file->getClientOriginalExtension(),
                    "max_tablet" => time() . '_max_tablet.' . $file->getClientOriginalExtension(),
                    "medium" => time() . '_medium.' . $file->getClientOriginalExtension(),
                    "min" => time() . '_min.' . $file->getClientOriginalExtension(),
                ];
                $imageFile = Image::make($file);

                $imageFile->fit($this->productSize['medium']['width'], $this->productSize['medium']['height'])
                    ->save(public_path() . '/images/' . $fileName['medium']);
                $imageFile->fit($this->productSize['min']['width'], $this->productSize['min']['height'])
                    ->save(public_path() . '/images/' . $fileName['min']);
                $imageFile = Image::make($file);
                $this->setWatemark($imageFile);
                $imageFile->fit($this->productSize['max']['width'], $this->productSize['max']['height'])
                    ->save(public_path() . '/images/' . $fileName['max']);
                $imageFile->fit($this->productSize['max_tablet']['width'], $this->productSize['max_tablet']['height'])
                    ->save(public_path() . '/images/' . $fileName['max_tablet']);

                array_push($images, $fileName);
            }
        }
        return $images;
    }
}
