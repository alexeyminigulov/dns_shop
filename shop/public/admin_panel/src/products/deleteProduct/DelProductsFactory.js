'use strict';

module.exports = function DelProductsFactory($http, $q, ProductsFactory){


	function submit(id) {

		var deferred = $q.defer();

		$http({
			method 			 : 'DELETE',
			url    			 : 'admin/products/' + id,
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity
		})
			.then( function success(response){

				if(response.data.status === 200) {

					deferred.resolve("Товар удален!");
					ProductsFactory.deleteById(id);

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