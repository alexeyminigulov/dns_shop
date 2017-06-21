'use strict';

module.exports = function NewsFactory($http, $q){
	var news = [];

	function get() {
		var deferred = $q.defer();

		if(Array.isArray(news) && news.length) {
			
            deferred.resolve(news);
            return deferred.promise;
        }

		$http.get( 'admin/news' )
			.then( function success(response){

				news = angular.copy(response.data.data);
				deferred.resolve(response.data.data);
			},
			function error(response){

				deferred.reject('Ошибка на сервере!');
			} );

		return deferred.promise;
	}

	function getById(id) {
		var deferred = $q.defer();

		$http.get( 'admin/news/' + id )
			.then( function success(response){

				deferred.resolve(response.data);
			},
			function error(response){

				deferred.reject('Ошибка на сервере!');
			} );

		return deferred.promise;
	}

	function edit(id, data) {
		var deferred = $q.defer(),
            fd = new FormData();

        for (var key in data) {
            fd.append(key, data[key]);
        }
        $http.post( 'admin/news/'+id,
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
            })
            .then( function success(response){

                if(response.data.status === 200) {

					data.picture = response.data.picture;
					var res = { news: data, msg: 'Новость добавлена!' };
                    deferred.resolve(res);

                } else {
                    deferred.reject('Ошибка на сервера!');
                }

            }, function error(response){

                deferred.reject('Ошибка сервера!');
            } );
        return deferred.promise;
	}

	function del(id) {
		var deferred = $q.defer();

		$http.delete( 'admin/news/'+id )
			.then( function success(response){

				deferred.resolve("Новость удалена!");
			},
			function error(response){

				deferred.reject('Ошибка на сервере!');
			} );

		return deferred.promise;
	}

	function pagination(page) {
		var deferred = $q.defer();

		$http.get( 'admin/news?page='+page )
			.then( function success(response){

				var newNews = response.data.data;
				newNews = clearNews(newNews);
				if(newNews && newNews.length > 0) {
					news = news.concat(newNews);
				}
				deferred.resolve(news);
			},
			function error(response){

				deferred.reject('Ошибка на сервере!');
			} );

		return deferred.promise;
	}

	function search(title, page) {
		var deferred = $q.defer();
		page = (page>1) ? ('?page='+page) : '';

		$http.get( 'admin/news/search/title/' + title + page )
			.then( function success(response){

				if(page === '')
					news = angular.copy(response.data.data);
				else
					news = news.concat( angular.copy(response.data.data) );

				deferred.resolve(news);
			},
			function error(response){

				deferred.reject('Ошибка на сервере!');
			} );

		return deferred.promise;
	}

	function addNews(data) {

		news.unshift( data );
	}

	function clearNews(newNews) {
		for(var i = 0, length = newNews.length; i < length; i++) {

			if( news.find( function(val) { return newNews[i].id == val.id; } ) ) {
				newNews.splice(i, 1);
				return;
			}
		}
		return newNews;
	}

	function update(data) {
		news.find( function(val){
			if(val.id === data.id) {
				val.title = data.title;
				val.content = data.content;
				val.picture = data.picture;
			}
		} );
	}

	function deleteNews(data) {
			for(var i=0, length = news.length; i < length; i++) {
				if(news[i].id == data) {
					news.splice(i--, 1);
					length--;
					return;
				}
			}
	}


	
	return {

		get			: get,
		getById		: getById,
		edit		: edit,
		del			: del,
		pagination	: pagination,
		search		: search,
		addNews		: addNews,
		update		: update,
		deleteNews	: deleteNews

	}

};