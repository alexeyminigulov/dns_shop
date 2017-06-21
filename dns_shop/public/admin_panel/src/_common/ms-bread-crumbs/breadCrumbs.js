'use strict';

module.exports = function ($state, $timeout, $rootScope, CategoriesFactory){

        return {
            restrict: 'E',
            template: require('./template.html'),

            compile: function(element, attributes){

            	return {
		            post: function(scope) {

		            	scope.states = []; 	//	[{name,state},{name, state}]
		            	


		            	/*
		            	 * @name    _findBreadCrumb
						 * @param   {Object|Array} list states.
						 * @param   {String} state name.
						 * @returns {Object} `obj` {name: breadcrumb, state}.
						 */
		            	function _findBreadCrumb(arrayState, stateName){

		            		var state = { name : 'absent bread-crumb', state: null} ;
		            		for(var i = arrayState.length-1; i >= 0; i--) {

		            			if( !arrayState[i].hasOwnProperty("data") ) continue;
		            			if( !arrayState[i].data.hasOwnProperty("label") || !arrayState[i].hasOwnProperty("name") ) continue;		// isEmpty propertys
		            			if( (typeof (arrayState[i].data.label) !== "string") || (typeof (arrayState[i].name) !== "string") ) continue;	// isString Propertys
		            			if( arrayState[i].name !== stateName ) continue;
		            			state.name = arrayState[i].data.label;
		            			state.state = arrayState[i].name;
		            			if( arrayState[i].data.hasOwnProperty("parent") ) state.parent = arrayState[i].data.parent
		            			break;
		            		}
		            		return state;	// @return: {name, state} @param: stata
		            	}



		            	/*
		            	 * @name    getBreadCrumbs
						 * @param   {Object} object get with _findBreadCrumb()
						 * @returns {Object|Array} array breadCrumbs
						 */
		            	function getBreadCrumbs(result) {
								//debugger;
								//console.log($state.params);
								//console.log(result);
								var children = [];

								if(result.state === null) return;

								if(result.hasOwnProperty("parent")) {
									var parent = getBreadCrumbs( _findBreadCrumb( $state.get(), result.parent ) )
									children = children.concat( parent );
								}
								children.push(result);
								return children;
						}



						/*
		            	 * @name    isEmpty
						 * @param   {Object} obj.
						 * @returns {Boolean}
						 */
						function isEmpty(obj) {

						    // null and undefined are "empty"
						    if (obj == null) return true;

						    // Assume if it has a length property with a non-zero value
						    // that that property is correct.
						    if (obj.length > 0)    return false;
						    if (obj.length === 0)  return true;

						    // If it isn't an object at this point
						    // it is empty, but it can't be anything *but* empty
						    // Is it empty?  Depends on your application.
						    if (typeof obj !== "object") return true;

						    // Otherwise, does it have any properties of its own?
						    // Note that this doesn't handle
						    // toString and valueOf enumeration bugs in IE < 9
						    for (var key in obj) {
						        if (hasOwnProperty.call(obj, key)) return false;
						    }

						    return true;
						}



						/*
		            	 * @name   ancestorsCategories
						 * @param  {String} Category.parentId.
						 * @push   add scope.states array ancestorsCategories
						 */
						function ancestorsCategories(parentId, categories) {

							var category = categories.filter(function(val) {

								return val._id === parentId;
							});
							if( !Array.isArray(category) ) throw new SyntaxError("Не массив");
							category = category[0];
							if(typeof category !== "object") throw new SyntaxError("Не обьект");

							var ancestorsId = [];
							ancestorsId.push(parentId)
							ancestorsId = ancestorsId.concat(category.ancestors);

							var ancestors = categories.filter(function(val) {

								return ancestorsId.some(function(k) { return k === val._id; });
							});

							ancestors.forEach(function(val) {

								var ancestor = {};
								ancestor.name = val.name;
								ancestor.state = 'categories({subcategory: "' +val._id+ '"})';
								scope.states.push( ancestor );
							});
							//console.log(ancestors);
						}



						/*
		            	 * @name    setupBreadCrumbs
						 * @change  scope.states
						 */
						function setupBreadCrumbs() {

							var result = _findBreadCrumb( $state.get(), scope.stateName );

							result = getBreadCrumbs(result);
							if( Array.isArray(result) ) {
								scope.states = result;

								// if there are params
								if( !isEmpty($state.params) ) {

									var params = '';
									for (var key in $state.params) {
										if( $state.params.hasOwnProperty('semanticUrl') 
											|| $state.params.hasOwnProperty('id') )
											params += key + ': \''+ $state.params[key] +'\',';
										else
						        			params += key + ': null,';
						    		}
						    		params = params.substring(0, params.lastIndexOf(','));
									scope.states[scope.states.length-1].state += '({' + params + '})';

									if( $state.params.hasOwnProperty("subcategory") && $state.params.subcategory!==undefined ) {

										CategoriesFactory.get()
											.then(function(data) {

												scope.states.concat( ancestorsCategories($state.params.subcategory, data) );

											}, function(date) {

												alert("Categories error data");
											} );
											
									}
								}
							}
						}



					    $rootScope.$on('$viewContentLoading', 
						function(event, viewConfig){ 
							
							$rootScope.$$listeners.$viewContentLoading = [];
							scope.stateName  = $state.current.name;
							setupBreadCrumbs();
						});

					    $rootScope.$on('$stateChangeSuccess', 
				        function(event, toState, toParams, fromState, fromParams, options){ 
				        	
							//$rootScope.$$listeners.$stateChangeSuccess = [];
				            scope.stateName = $state.current.name;
				            setupBreadCrumbs();
				        });
					}
				}
			},
			controller: 'breadCrumbsCtrl as model'
        };

};