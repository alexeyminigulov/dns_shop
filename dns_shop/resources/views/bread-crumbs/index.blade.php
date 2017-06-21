@if( count($catalog['ancestors']) > 0 )
    <ul class="bread-crumbs">
    @foreach ($catalog['ancestors'] as $id)
        <li class="hidden-xs hidden-sm">
            @include('category.includes.link', ['category' => \App\Category::find($id), 'title' => false])
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </li>
    @endforeach
        @if( !empty($showMainCategory) )
            <li class="hidden-xs hidden-sm">
                @include('category.includes.link', ['category' => $catalog, 'title' => false])
            </li>
        @endif
        @if( empty($showMainCategory) )
            <li>
                <i class="fa fa-angle-left arrow-left" aria-hidden="true"></i>
                <a href="{{ (!empty($catalog['parent']))
                                                                ? ('/catalog/'. \App\Category::find($catalog['parent'])->semanticUrl)
                                                                : '' }}">
                    <span>{{ $catalog['name'] }}</span>
                </a>
            </li>
        @else
            <li>
                <i class="fa fa-angle-left arrow-left" aria-hidden="true"></i>
                <i class="fa fa-angle-right arrow-right" aria-hidden="true"></i>
                <a href="{{ url()->previous() }}">
                    <span>{{ $product->name }}</span>
                </a>
            </li>
        @endif
    </ul>
@endif