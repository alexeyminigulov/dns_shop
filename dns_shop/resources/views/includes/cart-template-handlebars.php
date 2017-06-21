<script id="cart-template" type="text/x-handlebars-template">
    <div class="col-sm-12 col-md-8 col-lg-9">
        <div class="products products-list">
            {{#each this}}
            <div class="product" data-product-id="{{ id }}">
                <div class="col-xs-3 col-sm-2 col-md-2">
                    <div class="image">
                        <img class="center-block" src="{{ img }}" alt="{{ name }}">
                    </div>
                </div>
                <div class="col-xs-9 col-sm-8 col-md-7">
                    <div class="col-xs-12 col-sm-12 col-md-6">
                        <div class="caption">
                            <span>
                                {{ name }}
                            </span>
                        </div>
                        <div class="hidden-md visible-sm hidden-xs">
                            <div class="description">
                                <span>
                                    [4x2.35 ГГц, 6 ГБ, 2 SIM, Optic AMOLED, 1920х1080, Камера 16 Мп, 3G, 4G, BT, Wi-Fi, GPS, 3400 мАч]
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-5 col-md-6">
                        <div class="amount">
                            <div class="buttons">
                                <i class="fa fa-minus" aria-hidden="true"></i>
                                <span class="text-amount">{{ amount }}</span>
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-2 col-md-3">
                    <div class="col-xs-offset-4 price">
                        <span>{{math price "*" amount }} <i class="fa fa-rub" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>
            {{/each}}
        </div>
    </div>
    <div class="col-sm-12 col-md-4 col-lg-3">
        <div class="total price-total-amount">
            <div class="block-info">
                Итого:
            </div>
            <div class="block-price">
                <span>{{sum this }} <i class="fa fa-rub" aria-hidden="true"></i></span>
            </div>
            <div class="buy">
                <a class="btn-buy" href="/order">Оформить заказ</a>
            </div>
        </div>
    </div>
</script>