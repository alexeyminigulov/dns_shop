@if ( count($news) > 0 )
    <div class="news-widget">
        <div class="news-header">
            <a href="{{ route('news-list') }}">Новости</a>
        </div>
        <ul class="news-list">
            @foreach($news as $new)
                <li>
                    <a href="{{ route('news-item', $new->id) }}">
                        <img src="{{ asset('/images/'.json_decode($new->picture)->min) }}" alt="news">
                        <div class="title">
                            <span>{{ $new->title }}</span>
                        </div>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
@endif