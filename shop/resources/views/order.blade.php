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
                <div class="order-page-content">
                    <h1>Оформление заказа</h1>
                    <div class="tabs usr-cart">
                        @include('includes.order-template-handlebars')
                    </div>
                </div>
            </main>
        </div>
    </div>


@endsection

