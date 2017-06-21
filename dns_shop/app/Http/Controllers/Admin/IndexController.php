<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use App\RequestUser;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    public function __construct()
    {
        //
    }

    public function index() {

        return view('admin.angular.index');
    }

    public function getStatistics(Request $request) {

        $params = $request->all();
        if( !property_exists((object)$params, 'begindate') or !property_exists((object)$params, 'lastdate') ) {
            $params = [ 'begindate' => date('Y-m-d', strtotime('-1 months')), 'lastdate' => date('Y-m-d') ];
        }

        $beginDate = $params['begindate'];
        $lastDate = $params['lastdate'];
        $statistics = [];
        $statistics["statisticPurchase"] = $this->getStatisticByPurchase($beginDate, $lastDate);
        $statistics["countPresentProducts"] = $this->getCountPresentProducts();
        $statistics["countAbsenttProducts"] = $this->getCountAbsentProducts();
        $statistics["requestUsers"] = $this->getCountRequestUsers();
        $statistics["commonSumPurchase"] = $this->getSumPurchase( $statistics["statisticPurchase"]["purchase"] );
        $statistics["rangeDate"] = [ "beginDate" => $beginDate, "lastDate" => $lastDate ];

        return response()->json( $statistics );
    }

    /**
     * Creating date collection between two dates
     *
     * <code>
     * <?php
     * # Example 1
     * date_range("2014-01-01", "2014-01-20", "+1 day", "m/d/Y");
     *
     * # Example 2. you can use even time
     * date_range("01:00:00", "23:00:00", "+1 hour", "H:i:s");
     * </code>
     *
     * @author Ali OYGUR <alioygur@gmail.com>
     * @param string since any date, time or datetime format
     * @param string until any date, time or datetime format
     * @param string step
     * @param string date of output format
     * @return array
     */
    private function date_range($first, $last, $step = '+1 day', $output_format = 'd/m/Y' ) {

        $dates = array();
        $current = strtotime($first);
        $last = strtotime($last);

        while( $current <= $last ) {

            $dates[] = date($output_format, $current);
            $current = strtotime($step, $current);
        }

        return $dates;
    }

    private function getStatisticByPurchase($beginDate, $lastDate) {
        $period = $this->date_range($beginDate, $lastDate, "+1 day", "Y-m-d");
        $requestsUser = RequestUser::where('updated_at', '>', $beginDate)->where('updated_at', '<', $lastDate)->get();
        if( $requestsUser->isEmpty() ) {
            return [ "days" => [], "purchase" => [] ];
        }
        foreach ($requestsUser as $req) {
            $req->price = $req->getPrice();
        }
        $requestsUser = $requestsUser->toArray();
        $arrDays = [];
        $arrPurchase = [];
        foreach ($period as $day) {
            $reqUsr = array_filter($requestsUser, function($a)use($day) {
                return substr($a["updated_at"], 0, 10) == $day;
            });
            $price = 0;
            if(count($req)) {
                foreach ($reqUsr as $req) {
                    $price += $req['price'];
                }
            }
            $arrDays[]  = $day;
            $arrPurchase[] = $price;
        }
        return [ "days" => $arrDays, "purchase" => $arrPurchase ];
    }

    private function getCountPresentProducts() {
        $products = Product::where('amount', '>', 0)->where('backup_amount', '>', 0)->get();
        return count($products);
    }

    private function getCountAbsentProducts() {
        $products = Product::orWhere('amount', '<=', 0)->orWhere('backup_amount', '<=', 0)->get();
        return count($products);
    }

    private function getCountRequestUsers() {
        return RequestUser::all()->count();
    }

    private function getSumPurchase($arrPurchase) {
        $result = 0;
        if(!$arrPurchase) {
            return 0;
        }
        foreach ($arrPurchase as $purchase) {
            $result += $purchase;
        }
        return $result;
    }
}
