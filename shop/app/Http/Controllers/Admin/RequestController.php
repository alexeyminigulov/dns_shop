<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
//use App\Http\Requests;
use App\RequestUser;
use App\Product;
use \Exception;
use DB;
use Gate;
use Auth;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        $requestUser = new RequestUser();
        if( Gate::denies('index', $requestUser) )
        {
            return abort(404);
        }

        $requests = RequestUser::all();
        foreach ($requests as $value) {
            $value->user;
        }

        $requests = $requests->toArray();

        for ($i=0; $i < count($requests); $i++) { 
            $requests[$i]["user"] = $requests[$i]["user"]["login"];
        }

//         echo '<pre>';
//         print_r( $requests );
//         echo '</pre>';
        return response()->json( $requests );
    }



    public function indexById($id)
    {
        $user = Auth::user();
        $requestUser = new RequestUser();
        if( Gate::denies('indexById', $requestUser) )
        {
            return abort(404);
        }

        $request = RequestUser::find($id);
        $request->user;
        $request->requestProducts;
        foreach ($request->requestProducts as $val) {
            $val->product;
        }

        $request = $request->toArray();

        $request["user"] = $request["user"]["login"];
        for ($i=0; $i < count($request["request_products"]); $i++) { 
            $request["request_products"][$i]["product"] = $request["request_products"][$i]["product"]["name"];
        }

        return response()->json( $request );
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
    public function store(Request $request, $id)
    {
        $user = Auth::user();
        $requestUser = new RequestUser();
        if( Gate::denies('store', $requestUser) )
        {
            return response()->json([ 'status' => 400 ]);
        }

        if( is_int($id) ) {
            return response()->json([ 'status' => 400 ]);
        }
        $state = $request["state"];
        $status = 400;
        try {
            $req = RequestUser::findOrFail($id);
            if($req->status !== "в обработке") {
                throw new \Exception();
            }
        } catch(\Exception $e) {
            return response()->json( ["status" => 404, "msg" => "Ни чего нет, или обработан!"] );
        }

        if( $state === 1 ) {
            DB::beginTransaction();
            try {
                $req->status = 'обработана';
                $req->save();
                // Нужно вернуть зарезервированные товары на полку
                foreach ($req->requestProducts as $key => $value)
                {
                    $productId = $value->product_id;
                    $product = Product::findOrFail($productId);
                    $amount = $product->amount - $value->amount;
                    if( $amount < 0)
                        throw new \Exception();
                    $product->amount = $amount;
                    $product->save();
                }
                $status = 200;
                DB::commit();
            } catch (\Exception $e) {

                DB::rollback();
                return response()->json( ["status" => 404] );
            }
        }
        else if( $state === -1 ) {
            DB::beginTransaction();
            try {
                $req->status = 'откланена';
                $req->save();
                // Нужно вернуть зарезервированные товары на полку
                foreach ($req->requestProducts as $key => $value)
                {
                    $productId = $value->product_id;
                    $product = Product::findOrFail($productId);
                    $backup_amount = $product->backup_amount + $value->amount;
                    $product->backup_amount = $backup_amount;
                    $product->save();
                }
                $status = 200;
                DB::commit();
            } catch (\Exception $e) {

                DB::rollback();
                return response()->json( ["status" => 404] );
            }
        }
        
        return response()->json([ 'status' => $status ]);
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
