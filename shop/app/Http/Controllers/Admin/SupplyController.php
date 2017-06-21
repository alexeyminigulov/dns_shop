<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
//use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Auth;
use DB;
use \Exception;
use Gate;
use App\Supply;
use App\Product;
use App\SupplyProduct;

class SupplyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $supply = new Supply();
        if( Gate::denies('index', $supply) )
        {
            return abort(404);
        }

        $supplies = Supply::all();
        foreach ($supplies as $supply) {
            $supply["user"] = $supply->user;
        }
        return response()->json( $supplies );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexById($id)
    {
        $user = Auth::user();
        try {
            $supply = Supply::findOrFail($id);
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        if( Gate::denies('indexById', $supply) )
        {
            return abort(404);
        }

        foreach ($supply->supplyProducts as $value) {
            $value["product"] = $value->product;
        }
        return response()->json( $supply );
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
        if( ( isset( $request["products"] ) && ( count($request["products"]) === 0 ) ) 
            || !isset( $request["products"] ) )
            return response()->json( ["status" => 404] );

        $products = $request["products"];
        for ($i = 0, $length = count($products); $i < $length; $i++) {
            $idProd = $products[$i]["id"];
            try
            {
                $product = Product::findOrFail($idProd);
            }
            catch(ModelNotFoundException $e)
            {
                return response()->json( ["status" => 404] );
            }
            if( $i+1 === $length ) continue;
            for($j = $i+1; $j < $length; $j++) {
                try
                {
                    $product = Product::findOrFail($products[$j]["id"]);
                }
                catch(ModelNotFoundException $e)
                {
                    return response()->json( ["status" => 404] );
                }
                if( $products[$i]["id"] === $products[$j]["id"] ) {
                    $products[$i]["amount"] += $products[$j]["amount"];
                    array_splice ( $products, $j, 1 );
                    $j--;
                    $length--;
                }
            }
        }


        DB::beginTransaction();
        try {
            $supply = $user->supplies()->save(new Supply);
            for ($i = 0, $length = count($products); $i < $length; $i++)
            {
                $id = $products[$i]["id"];
                $amount = Product::findOrFail($id)->amount + $products[$i]["amount"];
                $backup_amount = Product::findOrFail($id)->backup_amount + $products[$i]["amount"];
                if( $amount < 0)
                    throw new Exception("Unfull amount!");
                $supply->supplyProducts()
                       ->save( new SupplyProduct(['product_id' => $id,
                                                  'amount' => $products[$i]["amount"] ]) );
                $product = Product::find($id);
                $product->amount = $amount;
                $product->backup_amount = $backup_amount;
                $product->save();
            }
            DB::commit();
        } catch (Exception $e) {

            DB::rollback();
            return response()->json( ["status" => 404] );
        }
        return response()->json( ["status" => 200, "id" => $supply->id,
                                  "user" => $user->name, "created_at" => $supply->created_at] );
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
        //
    }
}
