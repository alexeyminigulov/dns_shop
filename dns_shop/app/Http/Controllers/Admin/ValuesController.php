<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\TypeProduct;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\ListValue;
use App\Value;
use Gate;
use Auth;


class ValuesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $value = new Value();
        if( Gate::denies('store', $value) )
        {
            return response()->json( ['status' => 400] );
        }

        $id = $request["id"];
        $listValue = ListValue::find($id);
        $value->name = $request["name"];
        try {
            $listValue->values()->save($value);
        } catch (\Exception $e) {
            return response()->json( ['status' => 500, 'msg' => 'Запись уже существует!'] );
        }
        return response()->json( ['status' => 200, 'value' => $value] );
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
        $user = Auth::user();
        $value = new Value();
        if( Gate::denies('destroy', $value) )
        {
            return response()->json( ['status' => 400] );
        }

        $listValueId = Value::find($id)->list_value_id;
        if( count( TypeProduct::where([ 'fields.type.listValue' => intval($listValueId) ])->get() ) != 0 ) {

            return response()->json( ['status' => 404, "msg" => "Невозможно удалить! Привязана к таблице."] );
        }

        $value = Value::find($id);
        $value->delete();
        return response()->json( ['status' => 200] );
    }
}
