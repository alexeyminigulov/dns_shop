<ul class="catalog-subcatalog level-{{ $level }}">
    @foreach ($category['subcategory'] as $cat)
        <li>
            <div class="item-wrap">
                @include('category.includes.link', ['category' => $cat, 'title' => false])
            </div>
            @if ( isset($cat['subcategory']) )
                @include('category.includes.recursion', ['category' => $cat, 'level' => ++$level])
            @endif
        </li>
    @endforeach
</ul>