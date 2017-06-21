'use strict';

module.exports = function EditProductFactory($http, $q){

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
				if( typeof data[key][x] == 'object' && data[key][x].hasOwnProperty('medium') ) {
					if( data[key][x].hasOwnProperty('$$hashKey') )
						delete data[key][x]['$$hashKey'];
					fd.append( "imagesOld[]", JSON.stringify(data[key][x]) );
					continue;
				}
				fd.append( "images[]", data[key][x] );
			}
		}

		$http({
			method 			 : 'POST',
			url    			 : 'admin/products/' + semanticUrl + '/' + data.id,
			headers			 : { 'Content-Type': undefined },
			transformRequest : angular.identity,
			data			 : fd
		})
			.then( function success(response){

				if(response.data.status === 200) {
					
					deferred.resolve(response.data.images);

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