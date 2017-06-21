<a href="{{ !empty($category['table_id'])
                ? ('/products/'. \App\TypeProduct::find($category['table_id'])->semanticUrl)
                : ('/catalog/'. $category['semanticUrl'])
                }}">
    <span @if($title) class="title" @endif>{{ $category['name'] }}</span>
</a>