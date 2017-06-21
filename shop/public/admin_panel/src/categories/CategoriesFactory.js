'use strict';

module.exports = function CategoriesFactory($http, $q){

		var modelHeightCreate;

		var categories = null;


        function get() {

        	var deferred = $q.defer();
        	
        	/*setTimeout(function() {

			  if (categories) {
			      deferred.resolve(categories);
			  } else {
			      deferred.reject('Greeting is not allowed.');
			  }
			}, 2000);

        	return deferred.promise;*/

        	if(categories) {

        		deferred.resolve(categories);
        		return deferred.promise;
        	}

        	$http.get('admin/categories')
    			.then(function successCallback(response) {

    				if(categories === null) categories = response.data;

    				deferred.resolve(response.data);

				}, function errorCallback(response) {

					deferred.reject('Greeting is not allowed.');
				});
        	return deferred.promise;

        }

        function getById(id) {

            function setCategoryById() {

                function catchCategoryById(val) {
                    return id === val._id;
                }

                category = categories.find( catchCategoryById );
                if(category) {
                    deferred.resolve(category);
                } else {
                    deferred.reject('Category not found.');
                }
            }

            var deferred = $q.defer(),
                category = null;

            if(categories === null) {

                get().then( function success(response){

                    setCategoryById();
                }, function error(response){} );

                return deferred.promise;
            }

        	setCategoryById();

            return deferred.promise;
        }

        function setModelHeightCreate(val) {

        	modelHeightCreate = val;
        }

        function getModelHeightCreate() {

        	return modelHeightCreate;
        }

        function submitAdd(data) {

            var deferred = $q.defer(),
                fd = new FormData();

            for (var key in data) {
                fd.append(key, data[key]);
            }
            $http.post( 'admin/categories',
                fd,
                {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity,
                })
                .then(function successCallback(response) {

                    if(response.data.status != 200) {
                        deferred.reject(response.data.msg);
                        return;
                    }
                    categories.push( response.data.category );
                    deferred.resolve();

                }, function errorCallback(response) {

                    deferred.reject(response.data.msg);
                });
            return deferred.promise;
        }

        function deleteTreeCategories(id) {

            for(var i = 0, length = categories.length; i < length; i++) {

                if( categories[i]._id === id
                    || categories[i].ancestors.some(function(val){return val === id;}) === true ) {
                    categories.splice(i--, 1);
                    length--;
                }

            }
        }

        function addCash(category) {
            categories.push(category);
            return categories;
        }

        function updateCategory(updateCategory) {

            for(var i = 0, length = categories.length; i < length; i++) {

                if( categories[i]._id != updateCategory._id ) continue;

                for (var key in updateCategory) {
                    if (categories[i].hasOwnProperty(key)) {
                        
                        categories[i][key] = updateCategory[key];                        
                    }
                }
            }
        }


        return {
            get                  : get,
            getById              : getById,
            setModelHeightCreate : setModelHeightCreate,
            getModelHeightCreate : getModelHeightCreate,
            submitAdd            : submitAdd,
            deleteTreeCategories : deleteTreeCategories,
            addCash              : addCash,
            updateCategory       : updateCategory
        }

};