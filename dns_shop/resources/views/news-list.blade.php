@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <aside class="col-md-3 hidden-xs hidden-sm">
                @if ( count($categories) > 0 )
                    <ul class="catalog desktop">
                        @include('category.index')
                    </ul>
                @endif
                @include('includes.news-little-list', ['news' => $newsForWidget])
            </aside>


            <main class="col-md-9">

                <h1 class="page-title">Новости</h1>
                <div class="news-container">
                    <div class="row">
                        <ul class="news-list container">
                            @foreach ($news as $newsItem)
                            <li class="news-item col-xm-12 col-sm-12 col-md-12">
                                <div class="image col-xs-2 col-sm-1 col-md-1">
                                    <div class="row">
                                        <img src="{{ asset('/images/'.json_decode($newsItem->picture)->min) }}" alt="news">
                                    </div>
                                </div>
                                <div class="contant col-xs-10 col-sm-11 col-md-8">
                                    <div class="title"><a href="{{ route('news-item', $newsItem->id) }}">{{ $newsItem->title }}</a></div>
                                    <div class="contant-text hidden-xs visible-sm visible-md visible-lg">
                                        {!! substr(strip_tags($newsItem->content), 0, strpos(strip_tags($newsItem->content), ' ', 400)) .' ...' !!}
                                    </div>
                                </div>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
                {{ $news->links() }}

            </main>
        </div>
    </div>
@endsection