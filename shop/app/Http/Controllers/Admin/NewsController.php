<?php

namespace App\Http\Controllers\Admin;

use App\News;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Auth;
use Gate;
use File;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Config;
use Intervention\Image\Facades\Image;
use Mockery\CountValidator\Exception;

class NewsController extends Controller
{
    private $maxWidthImg = 3500;
    private $maxHeightImg = 3500;
    private $minWidthImg = 600;
    private $minHeightImg = 600;
    private $productSize = [
        'medium' => [ 'width' => null, 'height' => null ],
        'min' => [ 'width' => null, 'height' => null ]
    ];
    private $proportion;
    private $width;
    private $height;


    public function index(Request $request)
    {
        $user = Auth::user();
        $news = new News();
		$currentPage = intval( $request->input('\page', 1) );
        if( Gate::denies('index', $news) )
        {
            return abort(404);
        }
		
		\Illuminate\Pagination\Paginator::currentPageResolver(function() use ($currentPage) {
            return $currentPage;
        });

        $news = News::orderBy('id', 'desc')->paginate(5);
        return response()->json( $news );
    }

    public function search($title, Request $request)
    {
        $user = Auth::user();
        $news = new News();
		$currentPage = intval( $request->input('\page', 1) );
        if( Gate::denies('index', $news) )
        {
            return abort(404);
        }
		
		\Illuminate\Pagination\Paginator::currentPageResolver(function() use ($currentPage) {
            return $currentPage;
        });

        $news = News::where('title', 'LIKE', '%'.$title.'%')
                ->orderBy('id', 'desc')->paginate(5);
        return response()->json( $news );
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $news = new News();
        if( Gate::denies('store', $news) )
        {
            return abort(404);
        }
        if( !$request->has('title') || !$request->has('content') || !$request->hasFile("picture") ) {
            return response()->json( ["status"=>400] );
        }

        try {
            $this->setImage($request, $news);
        }
        catch (Exception $e){
            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }

        $news->title = $request->input("title");
        $news->content = $request->input("content");
        $news->save();

        return response()->json( ["status" => 200, "id" => $news->id, "picture" => $news->picture] );
    }

    public function show($id)
    {
        $user = Auth::user();
        $news = new News();
        if( Gate::denies('show', $news) )
        {
            return abort(404);
        }

        try{
            $news = News::findOrFail($id);
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        return response()->json( $news );
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $news = new News();
        if( Gate::denies('update', $news) )
        {
            return abort(404);
        }

        try
        {
            $news = News::findOrFail($id);
            if(!$request->has('title') || !$request->has('content')) {
                throw new ModelNotFoundException();
            }
            $news->title = $request['title'];
            $news->content = $request['content'];

            if ($request->hasFile("picture"))
            {
                $this->setImage($request, $news);
            }
            $news->save();
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        catch (Exception $e){
            return response()->json( [ "status" => 500, "msg" => $e->getMessage() ] );
        }
        return response()->json( ["status" => 200, 'picture' => $news->picture] );
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $news = new News();
        if( Gate::denies('destroy', $news) )
        {
            return abort(404);
        }

        try{
            $news = News::findOrFail($id);
            foreach ( json_decode($news->picture) as $value )
            {
                File::delete( 'images/' . $value );
            }
            $news->delete();
        }
        catch(ModelNotFoundException $e)
        {
            return abort(404);
        }
        return response()->json( ["status" => 200] );
    }



    private function checkImage(&$file) {

        $this->width = Image::make($file)->width();
        $this->height = Image::make($file)->height();

        if( !$file->isValid() or
            $this->width > $this->maxWidthImg or $this->height > $this->maxHeightImg or
            ($this->width < $this->minWidthImg and $this->height < $this->minHeightImg) )
            return false;

        if( $this->width > $this->height ) {

            $this->proportion = $this->width / $this->height;

            $this->productSize['medium']['width']  = Config::get('settings.news_img')['medium']['width'];
            $this->productSize['medium']['height'] = intval($this->productSize['medium']['width'] / $this->proportion);

            $this->productSize['min']['width']  = Config::get('settings.news_img')['min']['width'];
            $this->productSize['min']['height'] = intval($this->productSize['min']['width'] / $this->proportion);

        } else {

            $this->proportion = $this->height/$this->width;

            $this->productSize['medium']['height']  = Config::get('settings.news_img')['medium']['height'];
            $this->productSize['medium']['width'] = intval($this->productSize['medium']['height'] / $this->proportion);

            $this->productSize['min']['height']  = Config::get('settings.news_img')['min']['height'];
            $this->productSize['min']['width'] = intval($this->productSize['min']['height'] / $this->proportion);
        }

        return true;
    }

    private function setImage($request, &$news)
    {
        $file = $request->file("picture");
        if( !$this->checkImage($file) ) {
            throw new Exception("Изображение не корректно!");
        }
        $fileName = new \stdClass();
        $fileName->medium = time() . '_medium.' . $file->getClientOriginalExtension();
        $fileName->min = time() . '_min.' . $file->getClientOriginalExtension();

        $imageFile = Image::make($file);
        $imageFile->fit( $this->productSize['medium']['width'], $this->productSize['medium']['height'] )
            ->save( public_path() . '/images/' . $fileName->medium );
        $imageFile->fit( $this->productSize['min']['width'], $this->productSize['min']['height'] )
            ->save( public_path() . '/images/' . $fileName->min );

        if($news->picture) {
            foreach ( json_decode($news->picture) as $value )
            {
                File::delete( 'images/' . $value );
            }
        }
        $news->picture = json_encode($fileName);
    }
}
