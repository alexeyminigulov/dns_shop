'use strict';

module.exports = function CreateProductsFactory($http, $q, ProductsFactory){

	function submit(data, semanticUrl) {

		var deferred = $q.defer(),
            fd = new FormData();

            for (var key in data) {

                if(key !== 'images') {
                    fd.append(key, data[key]);
                    continue;
                }

                var ins = data[key].length;
                for (var x = 0; x < ins; x++) {
                    fd.append( "images[]", data[key][x] );
                }
            }

            $http.post( 'admin/products/' + semanticUrl,
                fd,
                {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity,
                })
                .then(function success(response) {

                    if(response.data.status !== 200) {
                    	deferred.reject('Ошибка на сервере!');
                    } else {
                        data.id = response.data.id;
                        data.images = response.data.images;
                        ProductsFactory.addProduct(angular.copy(data));
                    	deferred.resolve('Запись добавлена!');
                    }

                }, function error(response) {

                    deferred.reject('Ошибка сервера!');
                });
            return deferred.promise;
	}
	
	return {
		submit : submit
	}

};