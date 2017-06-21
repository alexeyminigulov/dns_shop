<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Manufacturer;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use File;

class ManufacturerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $manufacturer = Manufacturer::all();
        return response()->json( $manufacturer );
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
//        return response()->json( $request->all() );
//         echo '<pre>';
//         print_r( $request->all() );
//         echo '</pre>';

        if( !$request->has('name') or !$request->hasFile('logotype') )
            return abort(404);

        $file = $request->file('logotype');
        $fileName = time() . $file->getClientOriginalName();
        $file->move('images', $fileName);

        try {
            $manufacturer = Manufacturer::create(['name' => $request->input('name'), 'logotype' => $fileName]);
        } catch (\Exception $e) {
            abort(404);
        }
        return response()->json( ['id' => $manufacturer->id, 'logotype' => $manufacturer->logotype] );
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
        if( !$request->has('name')  )
            return abort(404);

        try{
            $manufacturer = Manufacturer::findOrFail($id);
            $manufacturer->name = $request->input('name');
            if( !$request->hasFile('logotype') )
            {
                $manufacturer->save();
                return response()->json( ['status' => 200] );
            }

            File::delete( 'images/' . $manufacturer->logotype );

            $file = $request->file('logotype');
            $fileName = time() . $file->getClientOriginalName();
            $file->move('images', $fileName);

            $manufacturer->logotype = $fileName;
            $manufacturer->save();

            return response()->json( ['status' => 200, 'logotype' => $manufacturer->logotype] );
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
//        return response()->json("fsfsfs");
        try{
            $manufacturer = Manufacturer::findOrFail($id);
            $counter = count( $manufacturer->products );
            if( $counter != 0 )
                return response()->json([ "status" => 400 ]);

            File::delete( 'images/' . $manufacturer->logotype );
            $manufacturer->delete();
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        return response()->json([ "status" => 200 ]);
    }
}
