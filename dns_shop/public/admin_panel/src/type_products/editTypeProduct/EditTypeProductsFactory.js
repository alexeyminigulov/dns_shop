'use strict';

module.exports = function EditTypeProductsFactory($http, $q, $rootScope){

	function submit(data) {

		var deferred = $q.defer(),
			fd;

		fd = JSON.stringify(data);

		$http({
			method 			 : 'POST',
			url    			 : 'admin/type-products/' + data._id,
			data			 : fd
		})
			.then( function success(response){

				deferred.resolve(response.data);

			}, function error(response){

				deferred.reject('Ошибка сервера!');
			} );
		return deferred.promise;

	}


	return {

		submit : submit
	}

};