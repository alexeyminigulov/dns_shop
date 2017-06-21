<?php

namespace App\Http\Controllers;

use App\Category;
use App\Product;
use App\RequestProduct;
use App\RequestUser;
use Illuminate\Http\Request;

use App\Http\Requests;
use Auth;
use Illuminate\Support\Facades\DB;
use Mockery\CountValidator\Exception;
use Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::getTreeCategories();

        return view('order', ['categories' => $categories]);
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
        try {
            DB::beginTransaction();

            $user = Auth::user();
            $order = json_decode( $request->input('order') );
            $requestUser = RequestUser::create([ 'user_id' => $user->id ]);
            foreach ($order as $item) {
                $product = Product::findOrFail($item->id);
                if( $product->backup_amount - $item->amount < 0) {
                    throw new Exception("Нет достаточного колличества товаров!");
                }
                $product->backup_amount = $product->backup_amount - $item->amount;
                $product->save();

                $requestProduct = RequestProduct::create([ 'product_id' => $item->id, 'amount' => $item->amount ]);
                $requestUser->requestProducts()->save( $requestProduct );
            }

            DB::commit();
        }
        catch (ModelNotFoundException $e) {
            DB::rollBack();
            return abort(404);
            //return response()->json([ $e->getMessage() ]);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return abort(404);
            //return response()->json([ $e->getMessage() ]);
        }
		
		Mail::send('emails.order', ['user' => $user, 'orderNumber' => $requestUser->id], function ($m) use ($user) {

            $m->to($user->email, $user->name)->subject('Получите Ваш заказ!');
        });
		
        return abort(200);

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

    public function success()
    {
        $categories = Category::getTreeCategories();
		
        return view('success-order', ['categories' => $categories]);
    }
}
