<a href="{{ !empty($category['table_id'])
                ? ('/products/'. \App\TypeProduct::find($category['table_id'])->semanticUrl)
                : ('/catalog/'. $category['semanticUrl'])
                }}">
    <div class="image">
        <img src="{{ asset('images/'. $category['logotype']) }}" alt="{{ $category['name'] }}">
    </div>
    {{ $category['name'] }}
    <i class="fa fa-angle-right" aria-hidden="true"></i>
</a>