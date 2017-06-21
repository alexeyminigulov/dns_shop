<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
//use App\Http\Requests;
use App\TypeProduct;
use App\Http\Controllers\Controller;
use Gate;
use Auth;

class TypeProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $tp = new TypeProduct();
        if( Gate::denies('index', $tp) )
        {
            return abort(404);
        }

        $typeProduct = TypeProduct::all();
        return response()->json( $typeProduct );
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
        $user = Auth::user();
        $typeProduct = new TypeProduct();
        if( Gate::denies('store', $typeProduct) )
        {
            return abort(404);
        }

        $typeProduct->name = $request["name"];
        $typeProduct->semanticUrl = $request["semanticUrl"];
        $fields = $request["fields"];

        foreach ($fields as &$field) {

            if( $field["type"]["name"] === 'string' ) {

                foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                    if($key === 'name' && $value === 'string')
                        continue;
                    unset($field["type"][$key]);
                }
                unset($value);
            }
            if( $field["type"]["name"] === 'integer' ) {

                foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                    if($key === 'name' && $value === 'integer')
                        continue;
                    if( ($key === 'unit') or ($key === 'min') or ($key === 'max') ) 
                    {
                        $field["type"][$key] = intval($value);
                        continue;
                    }
                    unset($field["type"][$key]);
                }
                unset($value);
            }
            if( $field["type"]["name"] === 'list' ) {

                foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                    if($key === 'name' && $value === 'list')
                        continue;
                    if( $key === 'listValue' ) { $field["type"][$key] = intval($value); continue;}  // Преобразуем шв в число
                    unset($field["type"][$key]);
                }
                unset($value);
            }
        }

        unset($field);
        $typeProduct->fields = $fields;
        $typeProduct->save();

        return response()->json( ['status' => 200, '_id' => $typeProduct->_id] );
        // echo '<pre>';
        // dd( $typeProduct );
        // echo '</pre>';
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
        $typeProduct = new TypeProduct();
        if( Gate::denies('update', $typeProduct) )
        {
            return response()->json( ['status' => 400] );
        }

        try{
            $status = 200;
            $typeProduct = TypeProduct::find($_id);
            $typeProduct->name = $request["name"];
            $typeProduct->semanticUrl = $request["semanticUrl"];
            $fields = $request["fields"];

            foreach ($fields as &$field) {

                if( $field["type"]["name"] === 'string' ) {

                    foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                        if($key === 'name' && $value === 'string')
                            continue;
                        unset($field["type"][$key]);
                    }
                    unset($value);
                }
                if( $field["type"]["name"] === 'integer' ) {

                    foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                        if($key === 'name' && $value === 'integer')
                            continue;
                        if( ($key === 'unit') or ($key === 'min') or ($key === 'max') )
                        {
                            $field["type"][$key] = intval($value);
                            continue;
                        }
                        unset($field["type"][$key]);
                    }
                    unset($value);
                }
                if( $field["type"]["name"] === 'list' ) {

                    foreach ($field["type"] as $key => &$value) {   //  Перебираем обект тип поля
                        if($key === 'name' && $value === 'list')
                            continue;
                        if( $key === 'listValue' ) { $field["type"][$key] = intval($value); continue;}  // Преобразуем шв в число
                        unset($field["type"][$key]);
                    }
                    unset($value);
                }
            }

            unset($field);
            $typeProduct->fields = $fields;
            $typeProduct->save();
        }
        catch (Exception $e) {
            $status = 500;
        }
        finally {
            return response()->json( ["status" => $status] );
        }
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
        $typeProduct = new TypeProduct();
        if( Gate::denies('destroy', $typeProduct) )
        {
            return response()->json( ['status' => 500] );
        }

        try{
            $status = 200;
            $typeProduct = TypeProduct::find($_id);
            $typeProduct->delete();
        } 
        catch (Exception $e) {
            $status = 500;
        }
        finally {
            return response()->json( ["status" => $status] );
        }
    }
}
