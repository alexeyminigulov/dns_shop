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
                <div class="catalog-filters">
                    <form name="characteristics" action="{{ url('/').'/products/'. $semanticUrl }}" method="GET">
                        <div class="filter-controls field-integer">
                            <div class="filter  collapse">
                                <label>Цена, р.
                                    <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                </label>
                                <div class="input-range fields">
                                    <div class="input-number">
                                        <input class="min" name="price-min" type="text" value="{{ $slider['min'] }}">
                                        <span>-</span>
                                        <input class="max" name="price-max" type="text" value="{{ $slider['max'] }}">
                                    </div>
                                    <div class="input-slider">
                                        <div class="slider-range"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="filter-controls brands checkboxradio">
                            <div class="filter  collapse">
                                <label>Производитель
                                    <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                </label>
                                <div class="block">
                                    <ul class="checkbox-list fields">
                                        @foreach( $brands as $i => $value )
                                            <li>
                                                <label for="brands-{{ $i }}">{{ $value->name }}
                                                    <input type="checkbox" name="brands[]"
                                                           value="{{ $value->id }}" id="brands-{{ $i }}">
                                                </label>
                                            </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {{--Пробегаемся по полям и создаем нужные виджеты фильтров--}}
                        @foreach($typeProduct->fields as $key => $field)
                            @if( $field['type']['name'] == 'list' )
                                <div class="filter-controls brands checkboxradio">
                                    <div class="filter  collapse">
                                        <label>{{ $field['name'] }}
                                            <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                        </label>
                                        <div class="block">
                                            <ul class="checkbox-list fields">
                                                @foreach( $listValue->find($field['type']['listValue'])->values as $i => $value )
                                                    <li>
                                                        <label for="{{ $key }}-{{ $i }}">{{ $value->name }}
                                                            <input type="checkbox" name="{{ $key }}[]"
                                                                   value="{{ $value->id }}" id="{{ $key }}-{{ $i }}">
                                                        </label>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            @endif
                            @if( $field['type']['name'] == 'integer' )
                                <div class="filter-controls field-integer">
                                    <div class="filter  collapse">
                                        <label>{{ $field['name'] }}, {{ \App\Unit::find($field['type']['unit'])->name }}
                                            <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                        </label>
                                        <div class="input-range fields">
                                            <div class="input-number">
                                                <input class="min" name="{{ $key }}[]" type="text" value="0">
                                                <span>-</span>
                                                <input class="max" name="{{ $key }}[]" type="text" value="{{ \App\ProductCharacter::orderBy('fields.'.$key, 'desc')->limit(1)->first()->fields[$key] }}">
                                            </div>
                                            <div class="input-slider">
                                                <div class="slider-range"></div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                            @endif
                        @endforeach
                        <div class="buttons static">
                            <button type="button" class="submit">Показать</button>
                        </div>
                    </form>
                </div>
            </aside>
            <main class="col-md-9">
                @include('bread-crumbs.index', ['catalog' => $catalog])
                <div class="btn-catalog-filter visible-xs visible-sm hidden-md"><a href="#">Filter</a></div>
                <div class="catalog-filters sudenav">
                    <div class="container">
                        <div class="row">
                            <div class="catalog-filters">
                                <form name="characteristics" action="{{ url('/').'/products/'. $semanticUrl }}" method="GET">
                                    <div class="filter-controls field-integer">
                                        <div class="filter  collapse">
                                            <label>Цена, р.
                                                <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                            </label>
                                            <div class="input-range fields">
                                                <div class="input-number">
                                                    <input class="min" name="price-min" type="text" value="{{ $slider['min'] }}">
                                                    <span>-</span>
                                                    <input class="max" name="price-max" type="text" value="{{ $slider['max'] }}">
                                                </div>
                                                <div class="input-slider">
                                                    <div class="slider-range"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filter-controls brands checkboxradio">
                                        <div class="filter  collapse">
                                            <label>Производитель
                                                <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                            </label>
                                            <div class="block">
                                                <ul class="checkbox-list fields">
                                                    @foreach( $brands as $i => $value )
                                                        <li>
                                                            <label for="brands-mobile-{{ $i }}">{{ $value->name }}
                                                                <input type="checkbox" name="brands[]"
                                                                       value="{{ $value->id }}" id="brands-mobile-{{ $i }}">
                                                            </label>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {{--Пробегаемся по полям и создаем нужные виджеты фильтров--}}
                                    @foreach($typeProduct->fields as $key => $field)
                                        @if( $field['type']['name'] == 'list' )
                                            <div class="filter-controls brands checkboxradio">
                                                <div class="filter  collapse">
                                                    <label>{{ $field['name'] }}
                                                        <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                                    </label>
                                                    <div class="block">
                                                        <ul class="checkbox-list fields">
                                                            @foreach( $listValue->find($field['type']['listValue'])->values as $i => $value )
                                                                <li>
                                                                    <label for="{{ $key }}-id-{{ $i }}">{{ $value->name }}
                                                                        <input type="checkbox" name="{{ $key }}[]"
                                                                               value="{{ $value->id }}" id="{{ $key }}-id-{{ $i }}">
                                                                    </label>
                                                                </li>
                                                            @endforeach
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                        @if( $field['type']['name'] == 'integer' )
                                            <div class="filter-controls field-integer">
                                                <div class="filter  collapse">
                                                    <label>{{ $field['name'] }}, {{ \App\Unit::find($field['type']['unit'])->name }}
                                                        <div class="arrow up-arrow"><i class="fa fa-angle-up" aria-hidden="true"></i></div>
                                                    </label>
                                                    <div class="input-range fields">
                                                        <div class="input-number">
                                                            <input class="min" name="{{ $key }}[]" type="text" value="0">
                                                            <span>-</span>
                                                            <input class="max" name="{{ $key }}[]" type="text" value="{{ \App\ProductCharacter::orderBy('fields.'.$key, 'desc')->limit(1)->first()->fields[$key] }}">
                                                        </div>
                                                        <div class="input-slider">
                                                            <div class="slider-range"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                    @endforeach
                                    <div class="buttons bottom-fixed">
                                        <button type="button" class="submit">Показать</button>
                                        <button type="button" class="closebtn">Выход</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="products products-list">
                    <div class="list">
                        @foreach($products as $product)
                            <div class="product"
                                 data-product-id="{{ $product->id }}"
                                 data-product-price="{{ $product->price }}"
                                 data-product-name="{{ $product->name }}"
                                 data-product-img="{{ asset('images/'. $product->logotype['medium']) }}">
                                <div class="col-md-2 col-sm-2 col-xs-3">
                                    <div class="image">
                                        <img class="center-block"
                                             src="{{ asset('/images/'. $product->logotype['medium']) }}"
                                             alt="{{ $product->name }}">
                                    </div>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-9">

                                    <div class="col-md-7 col-sm-9 col-xs-9">
                                        <div class="caption">
                                            <a href="{{ route('product.show', ['id' => $product->id]) }}">
                                                <span>{{ $product->name }}</span>
                                            </a>
                                        </div>
                                        <div class="visible-lg visible-md visible-sm hidden-xs">
                                            <div class="description">
                                                @include('includes.product-description', ['product' => $product, 'typeProduct' => $typeProduct])
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5 col-sm-3 col-sm-offset-0 col-xs-12 col-xs-offset-0">
                                        <div class="price">
                                            <span>{{ number_format($product->price, 0, '', ' ') }} <i class="fa fa-rub" aria-hidden="true"></i></span>
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
                        @endforeach
                    </div>
                    <div class="pagination">
                        <a class="button">Показать еще <i class="fa fa-caret-down" aria-hidden="true"></i></a>
                    </div>
                </div>
            </main>
        </div>
    </div>


@endsection

