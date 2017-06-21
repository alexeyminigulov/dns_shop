@foreach ($categories as $category)
    @if ( !$category['parent'] )
        <li>
            @include('category.includes.link', ['category' => $category, 'title' => true])
            <i class="fa fa-angle-right" aria-hidden="true"></i>
            @if ( isset($category['subcategory']) )
                <div class="sub-wrap">
                    @if ( count($category['subcategory']) > 0 )
                        <ul class="catalog-subcatalog level-1">
                            @foreach ($category['subcategory'] as $cat)
                                <li class="grid-item">
                                    <div class="item-wrap">
                                        @include('category.includes.link', ['category' => $cat, 'title' => false])
                                    </div>
                                    @if ( isset($cat['subcategory']) )
                                        @include('category.includes.recursion', ['category' => $cat, 'level' => 2])
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            @endif
        </li>
    @endif
@endforeach