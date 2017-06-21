'use strict';

module.exports = function ProductsFactory($http, $q){

	var products = null,
        url = '';


	function get(productSemanticUrl){

		var deferred = $q.defer();

        if(!products || url==='' || url!==productSemanticUrl) {

            $http.get( 'admin/products/' + productSemanticUrl + '?page=1' )
                .then( function success(response) {

                    products = response.data.data;
                    //angular.copy( response.data, products );
                    deferred.resolve(response.data.data);
                    url = productSemanticUrl
                },
                function error(response) {

                    deferred.reject('Такой вид товаров не найден!');
                } );
        } else {
            deferred.resolve(products);
            url = productSemanticUrl
        }
				
		return deferred.promise;
	}

	function getById(id, url) {

        function setProductById() {

            product = products.find( function (val) {
            	return id === val.id;
            } );

            if(product) {
                deferred.resolve(product);
            } else {
                deferred.reject('Данный товар не найден!');
            }
        }

        var deferred = $q.defer(),
            product = null;

        if(!products) {

            get(url).then( function success(response){

            	products = response;
                //angular.copy( response, products );
                setProductById();

            }, function error(response){

            	deferred.reject('Ошибка на сервере!')
            } );
        } else {

        	setProductById();
        }
        return deferred.promise;
    }

	/*
	 *	Чистка массива products
	 */
	function deleteProducts(idTable) {

		if(!products) return;

		for(var i = 0, length = products.length; i < length; i++) {

            if( products[i].type_product_id === idTable ) {
                products.splice(i--, 1);
                length--;
            }

        }
	}

    function deleteById(id) {

        for(var i = 0, length = products.length; i < length; i++) {

            if( products[i].id === id ) {
                products.splice(i, 1);
                return;
            }

        }
    }

    function search(params, url) {
        var deferred = $q.defer();

        if(!params) {
            products = null;
            get(url).then( function success(response){

                products = response;
                deferred.resolve(response);

            }, function error(response){

                deferred.reject('Ошибка на сервере!')
            } );
            return deferred.promise;
        }

        $http.get( 'admin/products/search-ajax/' + params )
            .then( function success(response) {

                if(url == undefined)
                    products = angular.copy(response.data.data);
                else
                    products = products.concat( angular.copy(response.data.data) );
                deferred.resolve(response.data.data);
            },
            function error(response) {

                deferred.reject('Такой вид товаров не найден!');
            } );

        return deferred.promise;
    }

    function addProduct(data) {

        products.push( data );
    }

    function searchAJAX(params) {
        if(!params) return;
        var deferred = $q.defer();

        $http.get( 'admin/products/search/' + params )
            .then( function success(response) {

                deferred.resolve(response.data);
            },
            function error(response) {

                deferred.reject('Такой вид товаров не найден!');
            } );

        return deferred.promise;
    }

    function pagination(productSemanticUrl, page) {
        var deferred = $q.defer();

        $http.get( 'admin/products/' + productSemanticUrl + '?page=' + page )
            .then( function success(response) {

                products = products.concat(response.data.data);
                deferred.resolve(response.data.data);
            },
            function error(response) {

                deferred.reject('Такой вид товаров не найден!');
            } );
        return deferred.promise;
    }


	
	return {
		get			   : get,
		getById		   : getById,
		deleteProducts : deleteProducts,
        deleteById     : deleteById,
        search         : search,
        addProduct     : addProduct,
        searchAJAX     : searchAJAX,
        pagination     : pagination
	}

};