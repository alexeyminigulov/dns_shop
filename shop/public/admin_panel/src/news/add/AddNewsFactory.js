'use strict';

module.exports = function AddNewsFactory($http, $q, NewsFactory) {

	
	function submit(data) {

        var deferred = $q.defer(),
            fd = new FormData();

        for (var key in data) {
            fd.append(key, data[key]);
        }
        $http.post( 'admin/news',
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
            })
            .then( function success(response){

                if(response.data.status === 200) {

                    data.id      = response.data.id;
                    data.picture = response.data.picture;
                    NewsFactory.addNews( angular.copy(data) );

                    deferred.resolve("Новость добавлена!");

                } else {
                    deferred.reject('Ошибка на сервера!');
                }

            }, function error(response){

                deferred.reject('Ошибка сервера!');
            } );
        return deferred.promise;
    }



	return {

		submit : submit

	}

};