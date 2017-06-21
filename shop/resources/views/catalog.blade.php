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
            </aside>


            <main class="col-md-9">
                @include('bread-crumbs.index', ['catalog' => $catalog])
                <h2>{{ $catalog['name'] }}</h2>
                <ul class="catalog">
                    @if( !empty($catalog['subcategory']) && is_array($catalog['subcategory']) )
                        @foreach($catalog['subcategory'] as $category)
                            <li class="category col-xs-12 col-sm-12 col-md-3 col-lg-3">
                                <img src="{{ asset('images/'. $category['logotype']) }}" alt="{{ $category['name'] }}">
                                @include('category.includes.link', ['category' => $category, 'title' => false])
                            </li>
                        @endforeach
                    @endif
                </ul>
            </main>


        </div>
    </div>
@endsection


