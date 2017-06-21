'use strict';

module.exports = function unitsCtrl( $timeout, $rootScope, $scope, $state, $stateParams, 
                    				NewsFactory, toastr ){

	var vm = this,
		page = 1,
		screenIsPhone = false;

	vm.news = [];
	vm.selectedNews = {};

	vm.editNews = editNews;
	vm.delNews = delNews;
	vm.pagination  = pagination;
	vm.selectNews  = selectNews();
	vm.getSourceImg= getSourceImg;
	


	init();


	function init(){

		getNews();
		setHeightNews();
		window.addEventListener("resize", setHeightNews);
	}

	function getNews() {
		page = 1;

		NewsFactory.get()
		.then( function(data) {

			angular.copy(data, vm.news);

		}, function(msg) {

			toastr.error(msg);
		} );
	}

	function setHeightNews() {
		//if phone
		if(document.documentElement.clientWidth > 480 ) { screenIsPhone = false; return; }

		screenIsPhone = true;
		// !!! Bad Code
		$timeout(function(){

			var collection    = document.querySelector('.collection.type-products'),
				heightWindow  = document.documentElement.clientHeight,
				heightFooter  = document.querySelector('.footer').offsetHeight,
				topCollection = collection.getBoundingClientRect().top,
				colletMargBot = parseInt( getComputedStyle(collection).marginBottom ),
				heightCollection;

			heightCollection = heightWindow - topCollection - heightFooter - colletMargBot;
			collection.style.height = heightCollection + 'px';
		});
	}

	function close() {

		window.removeEventListener("resize", setHeightNews);
	}

	function editNews($event, newsItem) {

		$event.stopPropagation();
		$event.preventDefault();

		$state.go('news.edit', {
			id : newsItem.id
		});
	}

	function delNews(e, newsItem) {

		e.stopPropagation();
		e.preventDefault();

		$state.go('news.deleteNews', {
			id : newsItem.id
		});
	}

	function selectNews() {
		var groupButtons = document.querySelector('.footer > .group-buttons'),
			oldCategoryId = null;
		return function(newsItem, option) {		//option('select','edit','open')
			option = option || 'select';
			if(typeof newsItem === 'object') vm.selectedNews = newsItem;

			if(!screenIsPhone) {

				$state.go("news.show", ({ id : newsItem.id }) );
				//console.log("Desctop");
				return;
			}

			if(option === 'select')
			if(oldCategoryId === newsItem._id || oldCategoryId === null) {
				Array.prototype.forEach.call(groupButtons.children, function(val) {
					//console.dir(val);
					val.classList.toggle('disabled');
					if( !val.classList.contains('disabled') )
						oldCategoryId = newsItem.id;
					else
						oldCategoryId = null;
				});
			}
			else {
				oldCategoryId = newsItem.id;
			}

			if(option === 'open') {

				$state.go( "news.show", {  id : vm.selectedNews.id  } );
			}

			if(option === 'edit') {
				$state.go('news.edit', {
					id : vm.selectedNews.id,
				});
			}

			if(option === 'delete') {
				$state.go('news.deleteNews', {
					id : vm.selectedNews.id
				});
			}

		}
	}

	function pagination(e) {
		if(e) e.preventDefault();
		++page;

		var searchValue = document.querySelector('.search input').value;

		if( !searchValue.length ) {

			NewsFactory.pagination(page)
			.then(function(data) {
				
				vm.news =angular.copy(data);

			}, function(msg) {

				toastr.error(msg);
			} );
		} else {

			NewsFactory.search(searchValue, page)
			.then( function(data) {
				
				vm.news = angular.copy(data);

			}, function(msg) {

				toastr.error(msg);
			} );
		}
	}

	function getSourceImg(data, size) {
		return JSON.parse(data)[size];
	}


	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams, options){ 
			
			if(toState.name !== "news") {
				$rootScope.$$listeners.$stateChangeStart = [];
				close();
			}	    
		});


	$scope.$on('searchNewsByName', function (event, title) {
		
		if(title !== '') {
			page = 1;
			NewsFactory.search(title)
			.then(function(data) {
				
				vm.news = angular.copy(data);

			}, function(msg) {

				toastr.error(msg);
			} );
		} else {

			getNews();
		}
		
	});

	$scope.$on( 'renderViewNews', function(event, data, method) {

		if(!data)
			getNews();
		else if(method==='update') {
			NewsFactory.update(data);
			getNews();
			// vm.news.find( function(val){
			// 	if(val.id === data.id) {
			// 		val.title = data.title;
			// 		val.content = data.content;
			// 		val.picture = data.picture;
			// 	}
			// } );
		}
		else if(method==='delete') {
			NewsFactory.deleteNews(data);
			getNews();
			// for(var i=0, length = vm.news.length; i < length; i++) {
			// 	if(vm.news[i].id == data) {
			// 		vm.news.splice(i--, 1);
			// 		length--;
			// 		return;
			// 	}
			// }
		}
	} );
    
};