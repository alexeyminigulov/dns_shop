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
                <div class="success-order-page-content">
                    <h1>Ваша заявка принята</h1>
                    <div class="content">
                        Ваша заявка успешна создана! Ждите прибытие оповещения на вашу почту.
                    </div>
                </div>
            </main>
        </div>
    </div>


@endsection

