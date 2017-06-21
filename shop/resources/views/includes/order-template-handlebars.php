<script id="order-template" type="text/x-handlebars-template">
    <div class="col-sm-12 col-md-12 col-lg-12">
        <div class="row">
            <div class="order-products">
                <table class="order-products-table">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Кол-во</th>
                        <th>Цена, <i class="fa fa-rub" aria-hidden="true"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    {{#each this}}
                    <tr data-product-id="{{ id }}"
                        data-product-amount="{{ amount }}">
                        <td>{{ name }}</td>
                        <td>{{ amount }}</td>
                        <td>{{math price "*" amount }}</td>
                    </tr>
                    {{/each}}
                    </tbody>
                </table>
                <div class="order-sum-price">
                    <span class="text">Итого: </span>
                    <span>{{sum this }} <i class="fa fa-rub" aria-hidden="true"></i></span>
                </div>
                <div class="btn-order-submit">
                    <button>Оформить заказ</button>
                </div>
            </div>
        </div>
    </div>
</script>