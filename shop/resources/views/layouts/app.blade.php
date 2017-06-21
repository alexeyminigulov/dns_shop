<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">

    <title>Shop</title>
    <meta name="description" content="">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <meta property="og:image" content="path/to/image.jpg">
    <link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="img/favicon/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-touch-icon-114x114.png">

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#000">
    <!-- Windows Phone -->
    <meta name="msapplication-navbutton-color" content="#000">
    <!-- iOS Safari -->
    <meta name="apple-mobile-web-app-status-bar-style" content="#000">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <style>body { opacity: 0; overflow-x: hidden; } html { background-color: #fff; }</style>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/main.min.css') }}">
</head>
<body id="app-layout">
    <header>
        <div class="top-header">

            <div class="hidden-xs hidden-sm desktop">
                <div class="container">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-5">
                            <div class="phone">
                                <i class="fa fa-mobile" aria-hidden="true"></i>
                                <strong class="phone-number">8-800-77-07-999</strong>
                                <span class="phone-worktime">(c 05:00 до 00:00)</span>
                            </div>
                        </div>
                        @if (Auth::guest())
                            <div class="col-md-1">
                                <div class="login">
                                    <a href="{{ url('/login') }}">Войти</a>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="register">
                                    <a href="{{ url('/register') }}">Регистрация</a>
                                </div>
                            </div>
                        @else
                            <div class="col-md-1">
                                <div class="user">
                                    {{ Auth::user()->login }}
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="logout">
                                    <a href="{{ url('/logout') }}">Выход</a>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>

            <div class="top-header-tablet-mobile  hidden-md hidden-lg">
                <div class="visible-xs visible-sm  tablet mobile">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-1 col-sm-1">
                                <div class="hamburger">
                                    <i class="fa fa-bars" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-7">
                                <div class="hidden-xs visible-sm">
                                    <div class="icon-logo tablet">
                                        <a class="logo" href="/" data-logo-title="data-original-title"></a>
                                    </div>
                                </div>
                                <div class="hidden-sm visible-xs">
                                    <div class="icon-logo mobile">
                                        <a class="logo" href="/" data-logo-title="data-original-title"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-2 col-sm-2">
                                <div class="btn-search">
                                    <a href="#">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-2 col-sm-2">
                                <div class="cart">
                                    <a href="{{ route('usr-cart') }}">
                                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden-xs hidden-sm  search">
                    <div class="container">
                        <div class="row">
                            <div class="col-xs-10 col-sm-10">
                                {{--<form class="search-product-form" action="/search/" method="get">--}}
                                    {{--<input class="search-input typeahead" type="text" placeholder="Find ...">--}}
                                {{--</form>--}}
                                <form class="search-product-form" method="get" href="/product/">
                                    <div class="input-group">
                                        <input class="search-input typeahead" type="text" placeholder="Find ...">
                                    </div>
                                </form>
                            </div>
                            <div class="col-xs-2 col-sm-2">
                                <div class="row">
                                    <a class="search-product btn cancel">Отмена</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="menu-sudenav">
                    <div class="container">
                        <div class="row">
                            <ul class="menu">
                                <li class="closebtn">
                                    <a href="javascript:void(0)">
                                        <i class="fa fa-times" aria-hidden="true"></i>
                                    </a>
                                </li>

                                @if (Auth::guest())
                                    <li>
                                        <a href="{{ url('/login') }}">
                                            Войти
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{ url('/register') }}">
                                            Регистрация
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                @else
                                    <li>
                                        <a>
                                            {{ Auth::user()->login }}
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{ url('/logout') }}">
                                            Выход
                                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                @endif

                                <li>
                                    <a href="">
                                        <div class="phone">
                                            <strong class="phone-number">8-800-77-07-999</strong>
                                            <span class="phone-worktime">(c 05:00 до 00:00)</span>
                                        </div>
                                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="hidden-xs hidden-sm desktop">
            <div class="header-search">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="icon-logo desktop">
                                <a class="logo" href="/" data-logo-title="data-original-title"></a>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <form class="search-form" method="get" href="/product/">
                                <div class="input-group">
                                    <input class="search-input typeahead" type="text" placeholder="Find ...">
                                    <button class="btn search-product" type="submit">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-2">
                            <div class="buttons">
                                <a href="{{ route('usr-cart') }}" class="cart">Корзина</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="visible-xs visible-sm hidden-md hidden-lg tablet mobile">
            <div class="header-catalog">
                <div class="container">
                    <a href="#">
                        Каталог
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>

            <div class="catalog-sudenav">
                <div class="container">
                    <div class="row">
                        <ul class="catalog mobile">
                            <li class="closebtn">
                                <a href="javascript:void(0)">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </a>
                            </li>
                            @if( isset($categories) )
                                @if( empty($catalog['subcategory']) )
                                    @foreach($categories as $category)
                                    <li>
                                        {{--<a href="#">--}}
                                            {{--{{ $category['name'] }}--}}
                                            {{--<i class="fa fa-angle-right" aria-hidden="true"></i>--}}
                                        {{--</a>--}}
                                        @include('category.includes.mobile-link', ['category' => $category])
                                    </li>
                                    @endforeach
                                @elseif( !empty($catalog['subcategory']) )
                                    @foreach($catalog['subcategory'] as $category)
                                        <li>
                                            @include('category.includes.mobile-link', ['category' => $category])
                                        </li>
                                    @endforeach
                                @endif
                            @endif
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </header>


    @yield('content')

    <footer>
        <div class="container">
            <div class="info">
                Информация, указанная на сайте, не является публичной офертой. Информация о товарах, их технических свойствах и характеристиках, ценах является предложением DNS делать оферты. Акцептом DNS полученной оферты является подтверждение заказа с указанием товара и его цены. Сообщение DNS о цене заказанного товара, отличающейся от указанной в оферте, является отказом DNS от акцепта и одновременно офертой со стороны DNS. Информация о технических характеристиках товаров, указанная на сайте, может быть изменена производителем в одностороннем порядке. Изображения товаров на фотографиях, представленных в каталоге на сайте, могут отличаться от оригиналов. Информация о цене товара, указанная в каталоге на сайте, может отличаться от фактической к моменту оформления заказа на соответствующий товар. Подтверждением цены заказанного товара является сообщение DNS о цене такого товара. Администрация Сайта не несет ответственности за содержание сообщений и других материалов на сайте, их возможное несоответствие действующему законодательству, за достоверность размещаемых Пользователями материалов, качество информации и изображений.
            </div>
        </div>
    </footer>

    <!-- JavaScripts -->
    <script src="{{ asset('js/scripts.min.js') }}"></script>

</body>
</html>
