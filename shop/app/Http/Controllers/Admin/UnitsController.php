<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\TypeProduct;
use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Unit;
use Auth;
use Gate;

class UnitsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $unit = new Unit();

        if(Gate::allows('show', $unit))
        {
            $units = Unit::all();
            return response()->json( $units );
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
        $unit = new Unit();

        if(Gate::allows('store', $unit))
        {
            $unit->name = $request["name"];
            $unit->save();

            return response()->json( ["status" => 200, "unit" => $unit] );
        }
        return response()->json( ["status" => 404] );
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
        $unit = Unit::find($id);

        if(Gate::allows('destroy', $unit))
        {
            if( count( TypeProduct::where([ 'fields.type.unit' => intval($id) ])->get() ) == 0 ) {
                $unit = Unit::find($id);
                $unit->delete();
                return response()->json(["status" => 200]);
            } else {

                return response()->json( ["status" => 404, "msg" => "Данный unit привязан к таблице!"] );
            }
        }
        return response()->json( ["status" => 404, "msg" => "У вас нет прав!"] );

//        $unit = Unit::find($id);
//        $unit->delete();
//        return response()->json( ["status" => 200] );
    }
}
