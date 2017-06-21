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
            <main class="col-md-12">
                <div class="row">
                    <div class="cart-page">
                        <div class="container">
                            <div class="tab-controls">
                                <div class="block">
                                    <span>Моя корзина</span>
                                </div>
                            </div>
                        </div>
                        <div class="tabs usr-cart">
                            @include('includes.cart-template-handlebars')
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>


@endsection

