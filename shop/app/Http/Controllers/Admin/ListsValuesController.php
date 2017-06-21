<?php

namespace App\Http\Controllers\Admin;

use App\TypeProduct;
use Illuminate\Http\Request;
//use App\Http\Requests;
use Auth;
use Gate;
use DB;
use App\Value;
use App\ListValue;
use App\Http\Controllers\Controller;

class ListsValuesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $listValue = new ListValue();

        if(Gate::allows('show', $listValue))
        {
            $values = Value::all();
            $listValue = ListValue::all();
            return response()->json( ['lists_values' => $listValue, 'values' => $values] );
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
        $user = Auth::user();
        $listValue = new ListValue();
        if( Gate::denies('store', $listValue) )
        {
            return abort(404);
        }

        try {
            $listValue->name = $request["name"];
            $listValue->save();
        } catch (\Exception $e) {
            return response()->json( ['status' => 500, 'msg' => 'Запись уже существует!'] );
        }
        return response()->json( ['status' => 200, 'lists_values' => $listValue] );
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
        $listValue = new ListValue();
        if( Gate::denies('store', $listValue) )
        {
            return response()->json( ['status' => 404, "msg" => "У Вас нет прав!"] );
        }

        if( count( TypeProduct::where([ 'fields.type.listValue' => intval($id) ])->get() ) != 0 ) {

            return response()->json( ['status' => 404, "msg" => "Невозможно удалить! Привязана к таблице."] );
        }

        DB::beginTransaction();
        try {
            $status = 200;
            $listValue = ListValue::findOrFail($id);
            $values = $listValue->values;
            $listValue->delete();
            $ids = [];
            foreach ($values as $val) {
                $ids[] = $val->id;
            }
            Value::destroy($ids);

            DB::commit();
        }
        catch (ModelNotFoundException $e) {
            $status = 500;
            DB::rollback();
        }
        finally {
            return response()->json( ['status' => $status] );
        }
    }
}
