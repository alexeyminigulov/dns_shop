'use strict';

module.exports = function editProductElement( $timeout, $rootScope ){

	return {
		restrict: 'E',

		template: require('./editProduct.html'),

		compile: function(element, attributes){
            	return {
		            post: function(scope) {

		            	var editModal       = document.querySelector('.side-nav-right'),
		            		tableProducts   = document.querySelector('table.products'),
		            		headerProduct	= document.querySelector('.products.header'),
		            		heightEditModal = editModal.scrollHeight;

		            	function close() {

		            		setEditModalHeight();
		            	}

		            	function setEditModalHeight(h) {
		            		h = h || "";
		            		setStyles();

		            		function setStyles() {
		            			h = (h !== "") ? h+"px" : "";
		            			$(editModal).css( { height: h } );
		            			$(tableProducts).css( { height: h } );
		            			headerProduct.style.display = headerProduct.style.display === 'none' ? '' : 'none';
		            		}

		            	}

		            	$rootScope.$on('$stateChangeStart', 
						function(event, toState, toParams, fromState, fromParams, options){ 
							
							if(toState.name !== "products.edit") {
								close();
							}  
						});

		            	$( document ).ready(function() {

		            		function checkHeightModal() {
		            			var height = editModal.scrollHeight;

							    if( heightEditModal === height ) {

							    	setEditModalHeight(heightEditModal);
							    	return;
							    }

							    $timeout( function() {

							    	heightEditModal = editModal.scrollHeight;
							    	setEditModalHeight(heightEditModal);
							    }, 200 );
		            		}

		            		checkHeightModal();
						});
		            }
		        }
		    }
	}

};