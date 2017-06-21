@if( !empty($product->productCharacter) and !empty($product->productCharacter->fields) )
<span>[
    @foreach($product->productCharacter->fields as $key => $value)
        @if( $typeProduct->fields[$key]['type']['name'] === 'integer' )
            {{ $value .' '. \App\Unit::find( $typeProduct->fields[$key]['type']['unit'] )->name }}
            {{ ( count($product->productCharacter->fields) != ($key+1) ) ? ',' : '' }}
        @elseif( $typeProduct->fields[$key]['type']['name'] === 'list' )
            {{ is_numeric(\App\Value::find( $value )->name) ? '' : \App\Value::find( $value )->name
            .(( count($product->productCharacter->fields) != ($key+1) ) ? ',' : '') }}
        @endif
    @endforeach
]</span>
@endif