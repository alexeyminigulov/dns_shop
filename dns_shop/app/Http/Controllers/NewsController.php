<?php

namespace App\Http\Controllers;

use App\Category;
use App\News;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

class NewsController extends Controller
{
    private $categories;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->categories = Category::getTreeCategories();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = News::orderBy('id', 'desc')->select(['id', 'title', 'picture', 'content'])->paginate(5);
        $newsForWidget = News::take(4)->select(['id', 'title', 'picture'])->get();

        return view('news-list', ['categories' => $this->categories, 'news' => $news, 'newsForWidget' => $newsForWidget]);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $newsItems = News::select(['id', 'title', 'picture', 'content'])->findOrFail($id);
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        $news = News::take(4)->select(['id', 'title', 'picture'])->get();

        return view('news', ['categories' => $this->categories, 'newsItems' => $newsItems, 'news' => $news]);
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
