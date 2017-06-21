'use strict';

module.exports = function TypeProductsFactory($http, $q, ProductsFactory){

	var typeProducts = null;
	var typeProduct = null;



	function get() {
		var deferred = $q.defer();

		if(typeProducts) {
			
            deferred.resolve(typeProducts);
            return deferred.promise;
        }

		$http.get( 'admin/type-products' )
					.then( function success(response){

						if(typeProducts === null) typeProducts = response.data;
						deferred.resolve(response.data);
					},
					function error(response){

						deferred.reject('Greeting is not allowed.');
					} );

		return deferred.promise;
	}

	function getOneTypeProduct(nameField, valueField) {

		function getTypeProduct(field, value) {

			return typeProducts.find( function(val) {
        		return val[nameField] === valueField;
        	} );
		}

        function set() {

            typeProduct = getTypeProduct(nameField, valueField);

            if(typeProduct) {
                deferred.resolve(typeProduct);
            } else {
                deferred.reject('Таких товаров нет!');
            }
        }

		var deferred = $q.defer();
        typeProduct = null;

        if(!typeProducts) {

            get()
                .then(function success(data) {

                    typeProducts = data;
                    set();

                }, function error(data) {

                    deferred.reject('Ошибка сервера!');
                } );

        } else {

            set();
        }

        return deferred.promise;
	}

	function getById(id) {

        function setTPById() {

            function catchTPById(val) {
                return id === val._id;
            }

            typeProduct = typeProducts.find( catchTPById );
            if(typeProduct) {
                deferred.resolve(typeProduct);
            } else {
                deferred.reject('Схема товара не найдена!');
            }
        }

        var deferred = $q.defer(),
            typeProduct = null;

        if(typeProducts === null) {

            get().then( function success(response){

                setTPById();
            }, function error(response){} );

            return deferred.promise;
        }

    	setTPById();

        return deferred.promise;
    }

    /*
     *  Чистка массива typeProducts
     */
    function deleteTP(id) {

        for(var i = 0, length = typeProducts.length; i < length; i++) {

            if( typeProducts[i]._id === id ) {
                typeProducts.splice(i, 1);
                ProductsFactory.deleteProducts(id);
                return;
            }
        }
    }

    function submitAdd(data) {

        var deferred = $q.defer();


        /*for (var key in data) {
            if(key === 'fields') {
                fd.append( key, JSON.stringify(data[key]) );
            } else {
                fd.append(key, data[key]);
            }
        }*/
        var fd = JSON.stringify(data);

        $http.post( 'admin/type-products', fd)
            .then( function success(response){

                if(response.data.status === 200) {

                    deferred.resolve("Товар обновлен!");
                    
                    data._id = response.data._id;
                    typeProducts.push( angular.copy(data) );

                } else {
                    deferred.reject('Ошибка на сервера!');
                }

            }, function error(response){

                deferred.reject('Ошибка сервера!');
            } );
        return deferred.promise;
    }

	

	return {
		get			  	  : get,

        delete            : deleteTP,

		getOneTypeProduct : getOneTypeProduct,

		getById			  : getById,

        submitAdd         : submitAdd
	}

};