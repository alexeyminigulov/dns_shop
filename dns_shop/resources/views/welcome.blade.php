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
            <h2>Лучшие предложения</h2>
            <div class="products">
                @foreach($products as $product)
                    <div class="product col-md-4 col-lg-3"
                         data-product-id="{{ $product->id }}"
                         data-product-price="{{ $product->price }}"
                         data-product-name="{{ $product->name }}"
                         data-product-img="{{ asset('images/'. $product->logotype['min']) }}">
                        <div class="row">
                            <div class="col-md-12 col-sm-3 col-xs-3">
                                <div class="image">
                                    <img class="center-block"
                                         src="{{ asset('/images/'. $product->logotype['medium']) }}"
                                         alt="{{ $product->name }}">
                                </div>
                            </div>
                            <div class="col-md-12 col-sm-9 col-xs-9">

                                <div class="col-md-12 col-sm-8 col-xs-12">
                                    <div class="caption">
                                        <a href="{{ route('product.show', ['id' => $product->id]) }}">
                                        <span>
                                            {{ $product->name }}
                                        </span>
                                        </a>
                                    </div>
                                    <div class="hidden-md visible-sm hidden-xs">
                                        <div class="description">
                                            @include('includes.product-description', ['product' => $product, 'typeProduct' => $product->typeProduct])
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-sm-4 col-sm-offset-0 col-xs-12 col-xs-offset-0">
                                    <div class="price">
                                        <span>{{ $product->price }} <i class="fa fa-rub" aria-hidden="true"></i></span>
                                    </div>
                                    @if( $product->backup_amount > 0 )
                                        <div class="buy">
                                            <a class="btn-buy">Купить</a>
                                        </div>
                                    @else
                                        <div class="product-absent">
                                            <span>Нет в наличии</span>
                                        </div>
                                    @endif
                                </div>

                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </main>


    </div>
</div>
@endsection


