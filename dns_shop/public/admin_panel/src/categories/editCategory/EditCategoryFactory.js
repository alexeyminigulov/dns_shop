'use strict';

module.exports = function CategoriesFactory($http, $q, CategoriesFactory){

	function getListProducts() {

		return $http.post( 'admin' + '/type-products' );
	}

	function submit(data) {

		var deferred = $q.defer(),
			fd = new FormData();

		for (var key in data) {
			fd.append(key, data[key]);
		}

		$http.post( 'admin/categories/' + data._id,
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
            })
		/*$http({
			method 			 : 'PATCH',
			url    			 : 'admin/categories/' + data._id,
			headers			 : { 'Content-Type': 'multipart/form-data' },
			transformRequest : angular.identity,
			data			 : fd
		})*/
			.then( function success(response){

				CategoriesFactory.updateCategory(response.data.category);
				deferred.resolve(response.data);

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;

	}
	
	return {
		getListProducts : getListProducts,
		submit : submit
	}

};