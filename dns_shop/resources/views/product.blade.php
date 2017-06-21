@extends('layouts.app')

@section('content')


    <div class="container">
        <div class="row">
            <aside class="col-md-3 hidden-xs hidden-sm">
                @if ( count($categories) > 0 )
                    <ul class="catalog desktop invisible">
                        @include('category.index')
                    </ul>
                @endif
            </aside>
            <main>
                @include('bread-crumbs.index', ['catalog' => $catalog, 'showMainCategory' => true, "product" => $product])
                <div class="product-description"
                     data-product-id="{{ $product->id }}"
                     data-product-price="{{ $product->price }}"
                     data-product-name="{{ $product->name }}"
                     data-product-img="{{ asset('images/'. $product->productCharacter->images[0]['min']) }}">
                    <div class="container">
                        <h1 class="title">
                            {{ $product->name }}
                        </h1>
                    </div>
                    <div class="price-item">
                        <div class="top-block  container">
                            <div class="row">

                                <div class="brand-logo  hidden-xs hidden-sm">
                                    <a href="#" data-original-title="Показать все товары производителя">
                                        <img src="{{ asset('images/'. $product->manufacturer->logotype) }}" alt="{{ $product->manufacturer->name }}">
                                    </a>
                                </div>
                                <div class="header-photo  col-sm-12 col-md-5 col-lg-5">

                                    <div class="image-slider">
                                        <div class="owl-carousel owl-theme owl-loaded">
                                            <div class="owl-stage-outer">
                                                <div class="owl-stage">
                                                    @foreach($product->productCharacter->images as $key => $image)
                                                        <div class="owl-item">
                                                            <a class="magnifier-thumb-wrapper" href="{{ asset('images/'. $image['max']) }}" data-fancybox="group" data-caption="{{ $key }}">
                                                                <img class="thumb-{{ $key }}" src="{{ asset('images/'. $image['medium']) }}">
                                                            </a>
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                            <div class="owl-controls hidden-xs">
                                                <div class="owl-nav">
                                                    <div class="owl-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                                                    <div class="owl-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="magnifier-preview  hidden-xs hidden-sm" id="preview"></div>

                                    <div class="image-carousel  hidden-xs hidden-sm">
                                        <div class="owl-carousel owl-theme owl-loaded">
                                            <div class="owl-stage-outer">
                                                <div class="owl-stage">
                                                    @foreach($product->productCharacter->images as $image)
                                                        <div class="item" data-index="{{ $item++ }}">
                                                            <img class="image" src="{{ asset('images/'. $image['min']) }}">
                                                        </div>
                                                    @endforeach
                                                </div>
                                            </div>
                                            <div class="owl-controls">
                                                <div class="owl-nav">
                                                    <div class="owl-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>
                                                    <div class="owl-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="header-order  col-sm-6 col-md-2 col-md-offset-1 col-lg-2 col-lg-offset-0">
                                    <div class="price">
                                        {{ number_format($product->price, 0, '', ' ') }} <i class="fa fa-rub" aria-hidden="true"></i>
                                    </div>
                                    <div class="buttons">
                                        @if( $product->backup_amount > 0 )
                                            <a href="#" class="buy">Корзина</a>
                                        @else
                                            <div class="product-absent">
                                                <span>Нет в наличии</span>
                                            </div>
                                        @endif
                                    </div>
                                </div>
                                <div class="header-additional  col-sm-6 col-md-2 col-md-offset-1 col-lg-3 col-lg-offset-2">
                                    <p><strong>Дополнительно:</strong></p>
                                    <p>Гарантия: 12 мес.</p>
                                    <p>Страна-производитель: Китай</p>
                                </div>

                            </div>
                        </div>
                        <div class="bottom-block">

                            <ul class="nav nav-tabs" id="myTab">
                                <li class="active"><a href="#home" data-toggle="tab">Главная</a></li>
                                <li><a href="#profile" data-toggle="tab">Профиль</a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="home">
                                    <h2>Описание {{ $product->name }}</h2>
                                    <p>{{ $product->description }}</p>
                                </div>
                                <div class="tab-pane" id="profile">
                                    <h2>Характеристики 15.6" Ноутбук Lenovo B5010 черный</h2>
                                    <div class="options-group">
                                        @if( count($typeProduct->fields) )
                                            <table class="table-params">
                                                <tbody>
                                                @foreach($product->productCharacter->fields as $key => $value)
                                                    <tr>
                                                        <td>{{ $typeProduct->fields[$key]['name'] }}</td>
                                                        @if( $typeProduct->fields[$key]['type']['name'] === 'integer' )
                                                            <td>{{ $value.' '.$typeProduct->fields[$key]['type']['unit'] }}</td>
                                                        @elseif( $typeProduct->fields[$key]['type']['name'] === 'list' )
                                                            <td>{{ $typeProduct->fields[$key]['type']['listValue'][$value] }}</td>
                                                        @endif
                                                    </tr>
                                                @endforeach
                                                </tbody>
                                            </table>
                                        @endif
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>


@endsection

