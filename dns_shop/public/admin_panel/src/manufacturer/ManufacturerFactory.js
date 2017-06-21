'use strict';

module.exports = function ManufacturerFactory($http, $q){

	var manufacturers = null;


	function get() {

		var deferred = $q.defer();

		if(manufacturers) {
			
            deferred.resolve(manufacturers);
            return deferred.promise;
        }

		$http.get('admin/manufacturer')
			.then( function success(response){

				manufacturers = angular.copy(response.data);
				deferred.resolve(manufacturers);
			},
			function error(response) {

				deferred.reject('Ошибка сервера!');
			} );
			
		return deferred.promise;
	}

    function getById(id) {

        function setManufacturerById() {

            manufacturer = manufacturers.find( function (val) {
                return id == val.id;
            } );

            if(manufacturer) {
                deferred.resolve(manufacturer);
            } else {
                deferred.reject('Данный товар не найден!');
            }
        }

        var deferred = $q.defer(),
            manufacturer = null;

        if(!manufacturers) {

            get().then( function success(response){

                manufacturers = angular.copy(response);
                setManufacturerById();

            }, function error(response){

                deferred.reject('Ошибка на сервере!')
            } );
        } else {

            setManufacturerById();
        }
        return deferred.promise;
    }

	function create(data) {
		var deferred = $q.defer(),
            fd = new FormData();

        for (var key in data) {

            fd.append(key, data[key]);
        }

        $http.post( 'admin/manufacturer',
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            })
            .then(function success(response) {
                
                var newManufacturer = angular.copy(data);
                	newManufacturer.id = response.data.id;
                	newManufacturer.logotype = response.data.logotype;

                manufacturers.push( angular.copy(newManufacturer) );

            	deferred.resolve("Производитель добавлен!");

            }, function error(response) {

                deferred.reject('Ошибка сервера!');
            });
        return deferred.promise;
	}

    function delManufacturer(id) {
        var deferred = $q.defer();

        $http.delete('admin/manufacturer/'+id)
            .then( function success(response){
                
                function clearCache() {
                    for(var i = 0, length = manufacturers.length; i < length; i++) {

                        if( manufacturers[i].id === id ) {
                            manufacturers.splice(i, 1);
                            return;
                        }
                    }
                }

                if(response.data.status === 200) {
                    
                    clearCache();
                    deferred.resolve("Производитель удален!");

                } else {
                    deferred.reject('Данный производитель привязан к товарам!');
                }
            },
            function error(response) {

                deferred.reject('Ошибка сервера!');
            } );
            
        return deferred.promise;
    }

    function edit(data) {
        var deferred = $q.defer(),
            fd = new FormData();

        for (var key in data) {
            fd.append(key, data[key]);
        }

        $http.post( 'admin/manufacturer/edit/' + data.id,
            fd,
            {
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            })
            .then( function success(response){
                
                function editCache() {
                    for(var i = 0, length = manufacturers.length; i < length; i++) {

                        if( manufacturers[i].id === data.id ) {
                            manufacturers[i] = data;
                            return;
                        }
                    }
                }
                    
                if( response.hasOwnProperty('data') && response.data.hasOwnProperty('logotype') )
                    data.logotype = response.data.logotype;
                editCache();
                deferred.resolve("Запись изменена!");
            },
            function error(response) {

                deferred.reject('Ошибка сервера!');
            } );
            
        return deferred.promise;
    }



	return {

		get			    : get,
		create		    : create,
        getById         : getById,
        delManufacturer : delManufacturer,
        edit            : edit

	}

};