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
                @include('includes.news-little-list', ['news' => $news])
            </aside>


            <main class="col-md-9">
                <div class="article news-view">
                    <h1>{{ $newsItems->title }}</h1>
                    <img src="{{ asset('/images/'.json_decode($newsItems->picture)->medium) }}" alt="news">
                    <p>{!! $newsItems->content !!}</p>
                </div>
            </main>


        </div>
    </div>
@endsection