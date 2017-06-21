<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Category;
use App\Http\Controllers\Controller;
use Auth;
use Gate;
use File;
use Validator;
use Illuminate\Support\Facades\Config;
use Intervention\Image\Facades\Image;
use Mockery\CountValidator\Exception;

class CategoriesController extends Controller
{
    private $maxWidthImg = 1500;
    private $maxHeightImg = 1500;
    private $minWidthImg = 135;
    private $minHeightImg = 135;
    private $width;
    private $height;
    private $proportion;


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $category = new Category();

        if(Gate::allows('show', $category))
        {
            $categories = Category::all();
            return response()->json( $categories );
        }
        return abort(404);
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
        $rules = array(
            'logotype' => 'required | mimes:jpeg,jpg,png | max:800',
        );
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json( [ "status" => 500, "msg" => "Не изображение загружено!" ] );
        }

        $user = Auth::user();
        $category = new Category();
        if( Gate::denies('store', $category) ) {
            return abort(404);
        }
        if( !$request->has("parent") || !$request->has("name") || !$request->has("semanticUrl") || !$request->hasFile("logotype") ) {
            return abort(404);
        }

        if( $request["parent"] === "" || !isset($request["parent"]) || $request["parent"] === "null" )
        {
            $parent = null;
            $ancestors = [];
        } 
        else
        {
            $parent = $request["parent"];
            $ancestors = explode(",", $request["ancestors"]);
        }

        function getNewCategory($request, $parent, $ancestors)
        {
            $newCategory = new Category;
            $newCategory->name = $request["name"];
            $newCategory->parent = $parent;
            $newCategory->ancestors = $ancestors;
            $newCategory->semanticUrl = $request["semanticUrl"];

            if( isset($request["tableId"]) )
            {
                if( trim($request["tableId"]) !== "" ) {
                    $newCategory->table_id = $request["tableId"];
                }
            }
            return $newCategory;
        }

        $newCategory = getNewCategory($request, $parent, $ancestors);

        try {
            $this->setImage($request, $newCategory);
            $newCategory->save();
        }
        catch (Exception $e){
            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }

        return response()->json( ["status" => 200, "category" => $newCategory] );
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
    public function update(Request $request, $_id)
    {
        $user = Auth::user();
        $category = new Category();

        if( Gate::denies('update', $category) )
        {
            return abort(404);
        }
        if( !$request->has("name") || !$request->has("semanticUrl") )
        {
            return abort(404);
        }

        try {
            $status = 200;
            $category = Category::findOrFail($_id);
            $category->name = $request["name"];
            $category->semanticUrl = $request["semanticUrl"];
            if( isset($request["table_id"]) ) {
                if( trim($request["table_id"]) !== "" ) {
                    $category->table_id = $request["table_id"];
                } else {
                    $category->table_id = null;
                }
            }
            if ($request->hasFile("logotype"))
            {
                $rules = array(
                    'logotype' => 'required | mimes:jpeg,jpg,png | max:800',
                );
                $validator = Validator::make($request->all(), $rules);
                if ($validator->fails()) {
                    throw new Exception("Не изображение загружено!");
                }
                
                $this->setImage($request, $category);
            }
            $category->save();
        }
        catch (ModelNotFoundException $e) {

            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }
        catch (Exception $e) {

            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }
        return response()->json( ["status" => $status, "category" => $category] );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($_id)
    {
        $user = Auth::user();
        $category = new Category();
        if( Gate::denies('destroy', $category) )
        {
            return abort(404);
        }

        try {
            $status = 200;
            $category = Category::findOrFail($_id);

            /**
             * Получить дочерние категории.
             *
             * @param  int  $_id
             * @return array
             */
            function getChildrenCategories($_id)
            {
                $collection = [];
                $categories = Category::all();
                $len = count($categories);
                for ($i = 0; $i < $len; $i++)
                {
                    if( is_array($categories[$i]->ancestors) )
                        if( count($categories[$i]->ancestors) !== 0 )
                            foreach ($categories[$i]->ancestors as $ancestor)
                            {
                                if($ancestor === $_id)
                                {

                                    array_push( $collection, Category::findOrFail($categories[$i]->_id)->_id );
                                    continue;
                                }
                            }
                }
                return $collection;
            }

            $collection = getChildrenCategories($_id);

            /**
             * Удалить дочерние категории.
             *
             * @param   array  $collection
             * @return  void
             */
            function delChildrenCategories($collection)
            {
                if(count($collection) > 0) {
                    foreach ($collection as $key => $value) {
                        $col = Category::findOrFail($value);
                        File::delete( 'images/' . $col->logotype );
                        $col->delete();
                    }
                }
            }

            delChildrenCategories($collection);

            $category->delete();
            File::delete( 'images/' . $category->logotype );
        }
        catch (ModelNotFoundException $e) {
            $status = 500;
        }
        finally {
            return response()->json( ["status" => $status] );
        }
    }


    /**
     * Проверяем изображение на корректность.
     *
     * @param  File  $file
     * @return void
     */
    private function checkImage(&$file) {

        $this->width = Image::make($file)->width();
        $this->height = Image::make($file)->height();

        if( !$file->isValid() or
            $this->width > $this->maxWidthImg or $this->height > $this->maxHeightImg or
            ($this->width < $this->minWidthImg and $this->height < $this->minHeightImg) )
            return false;

        if( $this->width > $this->height ) {

            $this->proportion = $this->width / $this->height;
            $this->width  = Config::get('settings.categories_img')['path']['width'];
            $this->height = intval($this->width / $this->proportion);

        } else {

            $this->proportion = $this->height/$this->width;
            $this->height  = Config::get('settings.categories_img')['path']['height'];
            $this->width = intval($this->height / $this->proportion);
        }

        return true;
    }

    /**
     * Добавляем изображениек в хранилище.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category &$category
     * @return void
     */
    private function setImage($request, &$category)
    {
        $file = $request->file("logotype");

        if( !$this->checkImage($file) ) {
            throw new Exception("Изображение не корректно!");
        }

        $fileName = time() . $file->getClientOriginalName();

        Image::make($file)->fit( $this->width, $this->height )
            ->save( public_path() . '/images/' . $fileName );
        if($category->logotype) {
            File::delete( 'images/' . $category->logotype );
        }
        $category->logotype = $fileName;
    }
}
