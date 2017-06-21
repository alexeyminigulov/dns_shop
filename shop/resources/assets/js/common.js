$(function() {
	'use strict';

	var topHeader = document.querySelector('.top-header'),
		headerDesktop = document.querySelector('header > .desktop'),
		searchForm = document.querySelector('.search-form'),
		btnHeaderSearch = topHeader.querySelector('.top-header .top-header-tablet-mobile .btn-search'),
		topHeaderMobile = topHeader.querySelector('.top-header .top-header-tablet-mobile .tablet.mobile'),
		topHeaderSearch = topHeader.querySelector('.top-header .top-header-tablet-mobile .search'),
		topHeaderSearchBtnCancel = topHeader.querySelector('.top-header .top-header-tablet-mobile .search .btn.cancel'),
		hamburger = document.querySelector('.hamburger'),
		menuSideNav = document.querySelector('.menu-sudenav'),
		btnCloseMenuSideNav = menuSideNav.querySelector('.closebtn'),
		body = document.body,
		catalogDesktopHidden = document.querySelector('.catalog.desktop.invisible'),
		btnHeaderCatalog = document.querySelector('header .header-catalog'),
		catalogSideNav = document.querySelector('.catalog-sudenav'),
		btnCloseCatalogSideNav = catalogSideNav.querySelector('.closebtn'),
		filterSidenav = document.querySelector('.catalog-filters.sudenav'),
		btnCloseFilterSideNav = filterSidenav && filterSidenav.querySelector('.closebtn'),
		btnOpenFilterSidenav = document.querySelector('.btn-catalog-filter'),
		logoIcon = document.querySelector('.icon-logo.desktop'),
		pathUrl = $(location).attr('pathname'),
		usrCartBtns = document.querySelectorAll('.cart a, a.cart'),
        btnBuy = document.querySelectorAll('a.btn-buy, a.buy'),
		blockPrice = document.querySelector('.block-price'),
		orderProducts,
		btnProductsPagination = document.querySelector('.products-list .pagination .button'),
		indentationTop = 71;

        usrCartBtns = Array.prototype.slice.call( usrCartBtns );
        btnBuy = Array.prototype.slice.call( btnBuy );


	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});


	function showOrHide(met) {

		return function(e) {
			if(e) e.preventDefault();
			var method = met;

			if(method == 'show') {
				method = {
					one : 'remove',
					two : 'add'
				};
			} else {

				method = {
					one : 'add',
					two : 'remove'
				};
			}

			// Hide top-header Block
			topHeaderMobile.classList[method.one]("visible-xs");
			topHeaderMobile.classList[method.one]("visible-sm");
			topHeaderMobile.classList[method.two]("hidden-xs");
			topHeaderMobile.classList[method.two]("hidden-sm");

			// Show top-header search Block
			topHeaderSearch.classList[method.two]("visible-xs");
			topHeaderSearch.classList[method.two]("visible-sm");
			topHeaderSearch.classList[method.one]("hidden-xs");
			topHeaderSearch.classList[method.one]("hidden-sm");	

		}
	}

	function openMenu(e) {
		if(e) e.preventDefault();

		if(!body.classList.contains("not-scrolling"))
			body.classList.add("not-scrolling");
		menuSideNav.style.width = "100%";
		menuSideNav.classList.add("open");
		if( catalogSideNav.classList.contains("open") ) {
			closeHeaderCatalog();
		}
		if( filterSidenav.classList.contains("open") ) {
			filterCatalogSidenav.closeCatalogFilter();
		}
	}

	function closeMenu(e) {
		if(e) e.preventDefault();

		body.classList.remove("not-scrolling");
		menuSideNav.style.width = "0";
		menuSideNav.classList.remove("open");
	}

	function showHeaderCatalog(e) {
		if(e) e.preventDefault();

		body.classList.add("not-scrolling");
		catalogSideNav.style.left = "0%";
		catalogSideNav.classList.add("open");
	}

	function closeHeaderCatalog(e) {
		if(e) e.preventDefault();

		if(e)
			body.classList.remove("not-scrolling");
		catalogSideNav.style.left = "100%";
		catalogSideNav.classList.remove("open");
	}


	var filterCatalogSidenav = (function filterCatalogSidenav() {
		btnOpenFilterSidenav && btnOpenFilterSidenav.addEventListener('click', openCatalogFilter);
		function openCatalogFilter(e) {
			e && e.preventDefault();

			if(!body.classList.contains("not-scrolling"))
				body.classList.add("not-scrolling");
			filterSidenav.style.left = "0%";
			filterSidenav.classList.add("open");
		}

		btnCloseFilterSideNav && btnCloseFilterSideNav.addEventListener('click', closeCatalogFilter);
		function closeCatalogFilter(e) {
			e && e.preventDefault();

			if(e)
				body.classList.remove("not-scrolling");
			filterSidenav.style.left = "100%";
			filterSidenav.classList.remove("open");
		}

		return {
			closeCatalogFilter : closeCatalogFilter
		}
	})();


	function scrolled() {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		var windowWidth = window.innerWidth;

		if(windowWidth < 992) {
			scrollTopHeaderMobile();
		} else {
			scrollHeaderDesktop();
		}


		function scrollHeaderDesktop() {
			if(topHeader.clientHeight < scrolled) {
				headerDesktop.classList.add("fixed-header");
				$(catalogDesktopHidden).css({
					"top" : scrolled + 25 - indentationTop + "px",
					"z-index" : "101"
				});
				$('body').css('marginTop', indentationTop + 'px');
				// if( !document.body.querySelector('.prop') ) {
				// 	var prop = document.createElement('div');
				// 	prop.className = "prop";
				// 	$(prop).css({
				// 		"height" : "0px",
				// 		"width"  : "100%"
				// 	});
				// 	document.body.appendChild(prop);
				// }
			}
			else {
				headerDesktop.classList.remove("fixed-header");
				$(catalogDesktopHidden).css({
					"top" : "",
					"z-index" : ""
				});
				$('body').css('marginTop', '');
				// if( document.body.querySelector('.prop') ) {
				// 	document.body.removeChild( document.body.querySelector('.prop') );
				// }
			}
		}

		function scrollTopHeaderMobile() {
			if(topHeader.clientHeight <= scrolled)
				topHeader.classList.add("fixed-top");
			if(topHeader.clientHeight > scrolled)
				topHeader.classList.remove("fixed-top");
		}
	}


	(function renderCategories() {
		var catalog = document.querySelector('aside .catalog.desktop');
		if(!catalog) return;
		// Обработаем каждый пункт каталога
		Array.prototype.forEach.call(catalog.children, function(item, index) {
			// получаем DIV блок .sub-wrap
			var subWrap = item.querySelector('.sub-wrap'),
				subCatalog;

			if(!subWrap)  return;
			// получаем UL
			subCatalog = subWrap.querySelector('.catalog-subcatalog.level-1');

			$(subWrap).css({
				"display": "block",
				"visibility": "hidden"
			});

			// Находим блок каталога с макс. шириной
			function findMaxWidthItem(catalog) {
				var width = 0;
				Array.prototype.forEach.call(catalog.children, function(item) {
					var w = item.offsetWidth;
					if(width < w) width = w;
				});
				return width;
			}
			var MAX_WIDTH = findMaxWidthItem(subCatalog);
			
			// Настроим данную ширину для всех блоков
			function setWidthItem(catalog, MAX_WIDTH) {
				Array.prototype.forEach.call(catalog.children, function(item) {
					$(item).css("width", MAX_WIDTH);
				});
			}
			setWidthItem(subCatalog, MAX_WIDTH);

			// Максимальный размер допустимого контента
			var MAX_WIDTH_CONTENT = document.querySelector('body main').offsetWidth - document.querySelector('body aside .catalog.desktop').offsetWidth - 100;
			var HEIGHT_CATEGORY = catalog.offsetHeight;			// Высота меню категории
			var heightSubWrap = subWrap.offsetHeight;
			var widthSubWrap = subWrap.offsetWidth;

			var arrSortBlocksCategory = [];		// Будующий массив отсортированных блоков вида: [[0]=>[child_0, child_2], [1]=>...]
			arrSortBlocksCategory = (function(categories) {
				var result = [];
				var arrHeight = [];
				var col = 0;
				var searchPut = false;	// Опция включит опцию поиска куда положить следующий блок

				Array.prototype.forEach.call(categories, function(blockCategory, i) {
					if(!result[col]) result[col] = [];
					if(!arrHeight[col]) arrHeight[col] = 0;

					if(searchPut) {

						var minHeight = { val: arrHeight[0], index: 0 };	// Поиск оптимальной позиции расположение блока
						arrHeight.forEach(function(val, imin){
							if(minHeight.val > val) {
								minHeight.index = imin;
								minHeight.val = val;
							}
						});

						result[minHeight.index].push(i);
						arrHeight[minHeight.index] += blockCategory.offsetHeight;
						return;
					}

					result[col].push(i);
					arrHeight[col] += blockCategory.offsetHeight;

					if(arrHeight[col] > HEIGHT_CATEGORY && ( (MAX_WIDTH_CONTENT / 2) > (col * MAX_WIDTH) ) )
						col++;
					else
						searchPut = true;
				} );

				var sortresult = [];
				//var sortheight = [];
				while(arrHeight.length) {

					var maxHeight = { val: arrHeight[0], index: 0 };	// Поиск оптимальной позиции расположение блока
					arrHeight.forEach(function(val, imin){
						if(maxHeight.val < val) {
							maxHeight.index = imin;
							maxHeight.val = val;
						}
					});
					sortresult.push( result[maxHeight.index] );
					//sortheight.push( arrHeight[maxHeight.index] );
					arrHeight.splice(maxHeight.index, 1);
					result.splice(maxHeight.index, 1);
				}
				result = sortresult;
				
				return result;
			})(subCatalog.children);

			// console.log(arrSortBlocksCategory);

			(function renderSortCategory(categories, arraySort) {

				var offsetLeft = 20,
					heightWrap = 0,
					widthWrap  = (arraySort.length * MAX_WIDTH) + (arraySort.length * offsetLeft) + offsetLeft;

				arraySort.forEach(function(items, column) {

					var cssHeight = 0;

					items.forEach(function(item, line){
						
						var blockCategoty = categories[item],
							// offsetLeft = (column > 0) ? offsetL : 0,
							offsetTop = 20;
							cssHeight += offsetTop;

						var left = (column * MAX_WIDTH) + (offsetLeft * column) + offsetLeft;
						$(blockCategoty).css({
							"position": "absolute",
							"top" : cssHeight + "px",
							"left": left + "px"
						});
						cssHeight += blockCategoty.offsetHeight;
						
						if(cssHeight > heightWrap) heightWrap = cssHeight + offsetTop;
					});


					// Натягиваем UL.catalog-subcatalog
					$(subCatalog).css({
						"width" : widthWrap + "px",
						"height": heightWrap + "px"
					});

					// Выравниваем по праваму краю блок категорий
					$(subWrap).css({
						"right": -(widthWrap + 1) + "px"
					});
				});
				
			})(subCatalog.children, arrSortBlocksCategory);

			$(subWrap).css({
				"display": "",
				"visibility": ""
			});
			// console.log("--------------------------");

			// Выравниваем по верхнему краю блок категорий
			$(subWrap).css({
				"top"  : -((index == 0) ? 1 : subWrap.parentNode.offsetHeight+1) + "px"
			});
		});
	})();

	btnHeaderSearch.addEventListener('click', showOrHide('show'));

	topHeaderSearchBtnCancel.addEventListener('click', showOrHide('hide'));

	hamburger.addEventListener('click', openMenu);

	btnCloseMenuSideNav.addEventListener('click', closeMenu);

	btnHeaderCatalog.addEventListener('click', showHeaderCatalog);

	btnCloseCatalogSideNav.addEventListener('click', closeHeaderCatalog);

	window.addEventListener('scroll', scrolled);

	if(catalogDesktopHidden)
		setCatalogDesktopHidden();

	function setCatalogDesktopHidden() {

		$(catalogDesktopHidden).css({
			"position" : "absolute",
			"width"	   : "100%",
			"z-index"  : "3"
		});
	}

	var paranga = null,
		indicate = false;
	function parangaCreate() {
		$('.paranga').remove();
		if(indicate) return;
		paranga = document.createElement('div');
		paranga.classList.add('paranga');
		document.body.appendChild(paranga);
		// console.log('create');

		setTimeout( function () {
			$(paranga).css({
				"top" : document.querySelector('header').offsetHeight + 'px',
				"opacity" : '0.5'
			});
			indicate = true;
			// console.log('asyncCreate');
		} );
	}
	function parangaDel() {
		if(!indicate) return;
		if(!paranga) return;

		document.body.onmousemove = function (e) {
			if ( e.target.closest('.catalog.desktop') || e.target.closest('.header-search') ) return;
			// console.log(e);
			// console.log('del');

			$(paranga).css({
				"opacity" : '0'
			});

			setTimeout( function () {
				document.body.onmousemove = function (e) {
					// console.log(e);
					func(e);
					document.body.onmousemove = null;
				};
				function func(e) {
					if ( e.target.closest('.catalog.desktop') || e.target.closest('.header-search') ) return;
					if(!indicate) return;
					$('.paranga').remove();
					paranga = null;
					indicate = false;
					// console.log('asyncDel');
				}
			}, 400 );

			document.body.onmousemove = null;
		};

	}

	function enterLogoIcon(e) {
		if(e) e.preventDefault();
		if(!catalogDesktopHidden) {
			return;
		}

		catalogDesktopHidden.classList.remove("invisible");

		indicate = false;
		parangaCreate();
	}

	function leaveLogoIcon(e) {

		if(e) e.preventDefault();
		if(!catalogDesktopHidden) {
			parangaDel();
			return;
		}

		// На кокой элемент вышел курсор
		var target = e.toElement;
		if(!target) {
			parangaDel();
			return;
		}

		// Проверим это не на меню категории
		while (target != document.body) {
			if (target.classList.contains("catalog") && target.classList.contains("desktop")) break;
			target = target.parentNode;
		}
		// Если не категории то закрыть
		if (target == document.body) {
			catalogDesktopHidden.classList.add("invisible");
			parangaDel();
			return;
		}
		// Иначе добавить событие onmouseleave на категории
		var catalogDesktop = target;
		catalogDesktop.onmouseleave = function(e) {

			if(e) e.preventDefault();
			catalogDesktopHidden.classList.add("invisible");
			this.onmouseleave = null;
			parangaDel();
		};

	}

	logoIcon.parentNode.addEventListener("mouseenter", enterLogoIcon);
	logoIcon.parentNode.addEventListener("mouseleave", leaveLogoIcon);

	;(function hoverCatalogDesktopVisible(){
		var catalog = document.querySelector('aside .catalog.desktop');
		if (!catalog) return;
		if(catalog.classList.contains('invisible')) {
			return;
		}

		function enterCatalog(e) {
			if(e) e.preventDefault;

			indicate = false;
			parangaCreate();
		}
		function leaveCatalog(e) {
			if(e) e.preventDefault;

			parangaDel();
		}
		
		catalog.addEventListener("mouseenter", enterCatalog);
		catalog.addEventListener("mouseleave", leaveCatalog);
	})();

	// Убираем меню если вышла на панель браузера
	document.addEventListener("mouseleave", hideMenu);
	function hideMenu(e) {
		e && e.preventDefault();

		closeMenu();
		function closeMenu() {
			$(paranga).css({
				"opacity" : '0'
			});
			$('.paranga').remove();
			paranga = null;
			indicate = false;
		}
	}


	// Owl Carousel
	$(document).ready(function(){

		var owlSlider = $('.image-slider .owl-stage');
		owlSlider.owlCarousel({
			items: 1,
			margin: 20,
			loop: true
		});

		$('.image-slider .owl-prev').click(function() {
			owlSlider.trigger('prev.owl.carousel');
		});
		$('.image-slider .owl-next').click(function() {
			// With optional speed parameter
			// Parameters has to be in square bracket '[]'
			owlSlider.trigger('next.owl.carousel', [300]);
		});

		// Magnifier.js
		var evt = new Event(),
		m = new Magnifier(evt);

		var itemsSlider = document.querySelectorAll('.image-slider .owl-stage > .owl-item');
		Array.prototype.forEach.call( itemsSlider, function(val, i) {
			var hrefMaxImg = val.querySelector('.magnifier-thumb-wrapper').getAttribute('href'),
				dataCaption = val.querySelector('.magnifier-thumb-wrapper').getAttribute('data-caption');
			m.attach({
				thumb: '.thumb-' + dataCaption,
				large: hrefMaxImg,
				largeWrapper: 'preview'
			});
		} );

		// Убираем изображение с выходом за область действия (на панель браузера)
		document.addEventListener("mouseleave", hideImgMagnifier);
		function hideImgMagnifier(e) {
			e && e.preventDefault();
			
			var images = document.querySelectorAll('.magnifier-preview .magnifier-large'),
				focuses = document.querySelectorAll('.image-slider .magnifier-lens');
			images = Array.prototype.slice.call( images );
			focuses = Array.prototype.slice.call( focuses );
			images.forEach( function (img) {
				if(!img.classList.contains("hidden")) {
					img.classList.add("hidden");
				}
			} );
			focuses.forEach( function (focus) {
				if(!focus.classList.contains("hidden")) {
					focus.classList.add("hidden");
					if(focus.parentNode.querySelector('.opaque')) {
						focus.parentNode.querySelector('.opaque').classList.remove('opaque');
					}
				}
			} );
		}

		var owlCarousel = $('.image-carousel .owl-stage');
		owlCarousel.owlCarousel({
			items: 4,
			margin: 10,
			loop: true
		});
		$('.image-carousel .owl-prev').click(function() {
			owlCarousel.trigger('prev.owl.carousel');
			// owlSlider.trigger('next.owl.carousel');
		});
		$('.image-carousel .owl-next').click(function() {
			owlCarousel.trigger('next.owl.carousel');
			// owlSlider.trigger('prev.owl.carousel');
		});
		var carouselImages = document.querySelectorAll('.image-carousel .owl-stage .item');

		function enterCarouselImages(e) {
			if(e) e.preventDefault();

			owlSlider.trigger('to.owl.carousel',[2, 300]);
			if(e.target.hasAttribute("data-index")) {
				var index = e.target.getAttribute("data-index")
				owlSlider.trigger('to.owl.carousel',[index, 300]);
			}
		}
		carouselImages.forEach( function(val) {
			val.addEventListener("mouseenter", enterCarouselImages);
		} );

	});


	// Tabs
	$(function () {
		$('#myTab a:first').tab('show')
	});


	// Fancybox
	$('[data-fancybox]').fancybox({
		image : {
			protect: true
		}
	});



	;(function formFilterProducts() {
		var catalogFilterDesctop = document.querySelector('aside .catalog-filters'),
			catalogFilterMobile = document.querySelector('main .catalog-filters');

		catalogFilter(catalogFilterDesctop);
		catalogFilter(catalogFilterMobile);

		function catalogFilter(blockFilter) {
			if(!blockFilter) return;
			var submit = blockFilter.querySelector("form .submit"),
				sliderInputs = [];
			if(submit)
				submit.addEventListener('click', submitFilter);
			// Slider filter price-products
			var fieldsInteger = blockFilter.querySelectorAll('.field-integer');
			Array.prototype.forEach.call( fieldsInteger, function (formSlider) {
				var slider = $( formSlider.querySelector(".slider-range") ),
					inputs = formSlider.querySelectorAll('.input-number input');
				sliderInputs.push( Array.prototype.slice.call(inputs) );
				var	min_max = {},
					inputs = Array.prototype.forEach.call(inputs, function(val) {
						min_max[val.className] = parseInt(val.value);
						val.value = '';
					}),
					price = {
						min: (min_max.min < min_max.max) ? min_max.min : 0,
						max: min_max.max
					};
				slider.slider({
					range: true,
					min: price.min,
					max: price.max,
					values: [ price.min, price.max ],
					create: function( event, ui ) {
						// $(formSlider.querySelector(".input-range .min")).val(price.min);
						// $(formSlider.querySelector(".input-range .max")).val(price.max);
					},
					slide: function( event, ui ) {
						$(formSlider.querySelector(".input-range .min")).val(ui.values[0]);
						$(formSlider.querySelector(".input-range .max")).val(ui.values[1]);
					}
				});
			} );

			// Checkbox
			$( blockFilter.querySelectorAll(".checkboxradio input") ).checkboxradio();

			// Accordion
			$( blockFilter.querySelectorAll(".collapse") ).accordion({
				icons: null,
				collapsible: true,
				beforeActivate: function( event, ui ) {
					if(ui.oldPanel.length === 1) {
						$(ui.oldHeader[0].parentNode).css("border", "none");
						ui.oldHeader[0].querySelector(".arrow").classList.remove("up-arrow");
						ui.oldHeader[0].querySelector(".arrow").classList.add("down-arrow");
					}
					else if(ui.oldPanel.length === 0) {
						$(ui.newHeader[0].parentNode).css("border", "");
						ui.newHeader[0].querySelector(".arrow").classList.remove("down-arrow");
						ui.newHeader[0].querySelector(".arrow").classList.add("up-arrow");
					}
				}
			});

			if (window.location.search.length) {
				setInputs();
			}
			function setInputs() {

				var filterParams = window.location.search.slice(1),
					checkboxradioInputs = Array.prototype.slice.call( blockFilter.querySelectorAll('.checkboxradio input') ),
					sliderInputs = Array.prototype.slice.call( blockFilter.querySelectorAll('.field-integer input') );
				checkboxradioInputs.forEach( function (input) {
					var str = input.getAttribute('name') +'='+ input.value;
					if( filterParams.indexOf(str) != -1 ) {
						$( input ).attr("checked","checked").change();
					}
				} );

				var indexParam = 0;
				sliderInputs.forEach( function (input, item) {
					// debugger;
					var str = input.getAttribute('name'),
						value = '',
						x = (item%2 == 0) ? 0 : 1,
						sliderRange = input.closest( ".input-range" ).querySelector('.slider-range');

					if(x == 1) indexParam += str.length;

					indexParam = filterParams.indexOf(str, indexParam);
					if ( indexParam == -1 ) {
						return;
					}

					var i = filterParams.indexOf('&', indexParam + str.length + 1);
					if( i == -1 ) {
						i = filterParams.length;
					}
					value = parseInt(filterParams.substring( indexParam + str.length + 1, i ));

					$(sliderRange).slider("values", x, value );
					input.value = value;
					// console.log(str +' '+ value);
				} );

			}

			function submitFilter(e) {
				e && e.preventDefault();
				var formFilter = blockFilter.querySelector("form"),
					filterUrl = formFilter.getAttribute('action'),
					switchs = true;

				sliderInputs.forEach( function (inputs) {
					if( inputs[0].value.length && inputs[1].value.length ) {
						if(switchs) {
							filterUrl += '/filter?';
							switchs = false;
						}
						if( filterUrl.slice(-1) != '?' ) {
							filterUrl += '&';
						}
						filterUrl += inputs[0].getAttribute('name') + '=' + inputs[0].value + '&';
						filterUrl += inputs[1].getAttribute('name') + '=' + inputs[1].value;
					}
				} );

				var inputsCheckList = Array.prototype.slice.call( blockFilter.querySelectorAll('form .checkbox-list input') );
				inputsCheckList.forEach( function (input) {
					if( !input.checked ) return;
					if(switchs) {
						filterUrl += '/filter?';
						switchs = false;
					}
					if( filterUrl.slice(-1) != '?' ) {
						filterUrl += '&';
					}
					filterUrl += input.getAttribute('name') + '=' + input.getAttribute('value');
				} );

				// console.log(filterUrl);
				// console.log(inputsCheckList);
				window.location.href = filterUrl;
			}
		}
	})();



	// TypeaHead
	var searchUrl = (pathUrl == '/')
						? '/products'
						: ( pathUrl.indexOf('products') == -1 )
						? '/products'
						: pathUrl;
	/*;(function liveSearch() {

		var posts = new Bloodhound({
			datumTokenizer: function(datum) {
				return Bloodhound.tokenizers.whitespace(datum.value);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				wildcard: '%QUERY',
				url: searchUrl + '/search?q=%QUERY',
				transform: function(response) {
					if(!response.products.length) return;
					response = response.products.map(function(val) {
						return {
							id: val.id,
							name: val.name
						};
					});
					return $.map(response, function(post) {
						return {
							value: post.name,
							id: post.id
						};
					});
					// var data = [];
					// for( var i = 0; i < response.products.length; i++){
					// 	data.push( { id: response.products[i].id, value: response.products[i].name } );
					// 	if(i == 2) break;
					// }
					// return data;
				}
			}
		});
		$(document.querySelectorAll('.typeahead')).typeahead(null, {
			display: 'value',
			source: posts,
			templates: {
				suggestion: function(data) {
					var details = "<div data-id=" +data.id+ ">" + data.value + "</div>";
					return details;
				}
			}
		}).bind('typeahead:select', function(ev, suggestion) {
			var href = searchForm.getAttribute('href') + suggestion.id;
			window.location.href = href;
		});

	})();*/
	var liveSearch = document.querySelectorAll('.typeahead'),
		url = searchUrl + '/search?q=';
	Array.prototype.forEach.call( liveSearch, function (val) {
		val.addEventListener('input', function (e) {
			e && e.preventDefault;
			var q = this.value,
				self = this,
				searchDiv = document.querySelector('.search-alive');

			if(q == '') {
				if(searchDiv) {
					searchDiv.parentNode.removeChild( searchDiv );
				}
				return;
			}

			$.ajax({
				method: "GET",
				url: url + q
			})
			.done(function(res) {
				var searchDiv = document.querySelector('.search-alive');
				res = res.products;
				if( res.length == 0 || self.value == '' ) {
					if(searchDiv) {
						searchDiv.parentNode.removeChild(searchDiv);
					}
					return;
				}
				var innerHTML = renderList(res),
					html = document.createElement('div');
				html.className = 'search-alive';
				html.innerHTML = innerHTML;
				if (!searchDiv) {
					self.parentNode.appendChild(html);
				} else {
					searchDiv.parentNode.replaceChild(html, searchDiv);
				}
			});

			function  renderList(data) {
				function renderItems(data) {
					var result = '';
					data.forEach( function(val){
						result += '<div><a href="' +'/product/' + val.id + '">' +val.name+ '</a></div>';
					} );
					return result;
				}
				return renderItems(data);
			}
		});
	} );

	// User-Cart
	;(function () {
		/*
		 *	Регистрируем новые возможности "математические операции"
		 */
		Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
			lvalue = parseFloat(lvalue);
			rvalue = parseFloat(rvalue);

			return priceSet({
				"+": lvalue + rvalue,
				"-": lvalue - rvalue,
				"*": lvalue * rvalue,
				"/": lvalue / rvalue,
				"%": lvalue % rvalue
			}[operator]);
		});
		Handlebars.registerHelper('sum', function (obj) {
			return priceSet(getCommonPrice(obj));
		});


		var products = JSON.parse( localStorage.getItem('products') );
        if( Array.isArray(products) ) {
            writeCaptionCart(products);
            if( window.location.pathname == '/cart' ) {
                renderCart(products);
            }
			else if( window.location.pathname == '/order' ) {
				renderOrder(products);
			}
        }

        function renderCart(products) {
			var source   = $("#cart-template").html(),
				template = Handlebars.compile(source),
				result = template(products),
				usrCart = document.querySelector('.usr-cart');

			usrCart.innerHTML = result;
        }

		function renderOrder(products) {
			var source   = $("#order-template").html(),
				template = Handlebars.compile(source),
				result = template(products),
				usrCart = document.querySelector('.usr-cart');

			usrCart.innerHTML = result;

			var btnOrder = document.querySelector('.btn-order-submit button');
			btnOrder.addEventListener('click', sendOrder);

			function sendOrder(e) {
				e.preventDefault();

				orderProducts = document.querySelectorAll('.order-products-table tbody tr');
				orderProducts = Array.prototype.slice.call( orderProducts );
				var products = [];

				orderProducts.forEach( function (val) {
					var productId = val.getAttribute('data-product-id'),
						productAmount = val.getAttribute('data-product-amount');

					products.push( { id: productId, amount: productAmount } );
				} );

				$.ajax({
					method: "POST",
					url: "/order",
					data: { order : JSON.stringify(products) }
				})
				.done(function() {
					localStorage.removeItem( 'products' );
					window.location.href = 'success-order';
				});

				// $('<form action="/order" method="POST">' +
				// 	'<input type="hidden" name="_token" value="' + $('meta[name="csrf-token"]').attr('content') + '">' +
				// 	'<input type="text" name="product-id[]" value="' + 44 + '">' +
				// 	'<input type="text" name="product-amount[]" value="' + 44 + '">' +
				// 	'<input type="submit">' +
				// 	'</form>').submit();

			}
		}

        // localStorage.removeItem("products");
        function getProductsParams(btnBuy) {
            var result = {};
            var node = btnBuy.closest('.product, .product-description');

            result.id = node.getAttribute('data-product-id');
            result.price = node.getAttribute('data-product-price');
			result.name = node.getAttribute('data-product-name');
			result.img = node.getAttribute('data-product-img');
			result.amount = 1;
			return result;
        }

		function getCommonPrice(products) {

			if(!products.length) {
				return 0;
			}

			return products.reduce( function(a, b) {
					a = ( Number.isInteger(parseInt(a)) ) ? a : (a.price * a.amount);
					b = ( Number.isInteger(parseInt(b)) ) ? b : (b.price * b.amount);
					return parseInt(a) + parseInt(b);
				}, {price: "0", amount: "0"} );
		}

		function getAmount(products) {
			var result = 0;
			products.forEach( function (val) {
				result += parseInt( val.amount );
			} );
			return result;
		}

        function writeCaptionCart(products) {
			var price = (getCommonPrice(products) === 0) ? 'Корзина' : getCommonPrice(products);
			var amount = getAmount(products);

            usrCartBtns.forEach(function (cartCaption) {
				if( cartCaption.closest('.tablet.mobile') ) {
					var span = document.createElement('span');
						span.textContent = amount;
						$(span).css({
							position : 'absolute',
							display : 'block',
							top : '11px',
							right : '0',
							fontSize : '13px',
							lineHeight : '13px',
							backgroundColor : 'orange',
							padding : '2px 5px',
							color : '#fff',
							fontWeight : '600'
						});
					cartCaption.insertBefore(span, cartCaption.lastChild);
					return;
				}
				if( products.length ){
					cartCaption.innerHTML = priceSet(price) + ' <i class="fa fa-rub" aria-hidden="true"></i>';
				}
                else {
					cartCaption.innerHTML = 'Корзина';
				}
            });
        }

        function addToCart(e) {
			e && e.preventDefault();

			var button = e.target,
				product = getProductsParams(button);

			products = JSON.parse( localStorage.getItem('products') );
			if( !Array.isArray(products) ) products = [];

			var link = products.find( function (val) {
				return val.id == product.id;
			} );
			if(link) {
				link.amount++;
			} else {
				products.push(product);
			}

			// console.log(products);
			writeCaptionCart(products);
			localStorage.setItem( 'products', JSON.stringify(products) );
        }

        btnBuy.forEach(function (button) {
            button.addEventListener('click', addToCart);
        });

		;(function setAmountBtns() {
			var amountBtns = document.querySelectorAll('.usr-cart .amount .buttons .fa');
			amountBtns = Array.prototype.slice.call( amountBtns );
			
			function changeAmount(e) {
				e && e.preventDefault();
				var target = e.target;

				function getProduct(target) {

					var id = parseInt( target.closest('.product').getAttribute('data-product-id') );
					return product = products.find( function (val) {
						return val.id == id;
					} );
				}

				function getProductDOM(target) {
					return target.closest('.product');
				}

				function getDOM(target) {

					getDOM.productDOM = getProductDOM(target);
					return {
						amount: getDOM.productDOM.querySelector('.text-amount'),
						price: getDOM.productDOM.querySelector('.price span'),
						sum: document.querySelector('.price-total-amount .block-price span')
					}
				}

				function delElemArrayProduct(products, product) {
					for(var i = 0, lenght = products.length; i < lenght; i++) {
						if(products[i].id == product.id) {
							products.splice(i, 1);
							break;
						}
					}
				}

				var product = getProduct(target);

				if('fa fa-plus' == target.className) {

					product.amount++;
				}
				else if('fa fa-minus' == target.className) {

					product.amount--;
					if( product.amount <= 0 ) {
						var elem = getProductDOM(target);
						elem.parentNode.removeChild(elem);

						delElemArrayProduct(products, product);
					}
				}
				update();

				function update() {
					getDOM(target).amount.innerHTML = priceSet(product.amount);
					getDOM(target).price.innerHTML = priceSet(product.amount * product.price) + ' <i class="fa fa-rub" aria-hidden="true"></i>';
					getDOM(target).sum.innerHTML = priceSet(getCommonPrice(products)) + ' <i class="fa fa-rub" aria-hidden="true"></i>';
					writeCaptionCart(products);
				}

				if(products.length === 0) {
					localStorage.removeItem( 'products' );
					return;
				}

				localStorage.setItem( 'products', JSON.stringify(products) );
			}
			
			amountBtns.forEach( function (btn, i) {
				btn.addEventListener('click', changeAmount);
			} );
		})();

	})();

	moment.locale('ru');
	var picker = new Pikaday({
		field: document.getElementById('birth_date'),
		format: 'YYYY-MM-DD',
		firstDay: 1,
		defaultDate: new Date(2000, 1, 1),
		minDate: new Date(1900, 1, 1),
		maxDate: new Date(2000, 11, 31),
		i18n: {
			previousMonth : 'Предыдущий месяц',
			nextMonth     : 'Следующий месяц',
			months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			weekdays      : ['Воскресение','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
			weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
		}
	});

	var page = getPage();
	function getPage() {
		var urlParams = QueryString(),
			page;
		if( urlParams && urlParams.hasOwnProperty('page') && Number.isInteger(parseInt(urlParams.page)) ) {
			page = parseInt(urlParams.page);
		} else {
			page = 1;
		}
		return page;
	}

	;(function productsPagination() {
		if(!btnProductsPagination) return;
		btnProductsPagination.addEventListener("click", paginate);
		var productsBlock = document.querySelector('.products.products-list .list');

		function renderProducts(products) {
			var source   = `{{#each this}}
							<div class="product"
								 data-product-id="{{ id }}"
								 data-product-price="{{ price }}"
								 data-product-name="{{ name }}"
								 data-product-img="/images/{{ logotype.medium }}">
								<div class="col-md-2 col-sm-2 col-xs-3">
									<div class="image">
										<img class="center-block"
											 src="/images/{{ logotype.medium }}"
											 alt="{{ name }}">
									</div>
								</div>
								<div class="col-md-7 col-sm-7 col-xs-9">
									<div class="caption">
										<a href="">
											<span>{{ name }}</span>
										</a>
									</div>
									<div class="hidden-md visible-sm hidden-xs">
										<div class="description">
											<span>
												{{ description }}
											</span>
										</div>
									</div>
								</div>
								<div class="col-md-3 col-sm-3 col-sm-offset-0 col-xs-9 col-xs-offset-3">
									<div class="price">
										<span>{{ price }} <i class="fa fa-rub" aria-hidden="true"></i></span>
									</div>
									<div class="buy">
										<a class="btn-buy">Купить</a>
									</div>
								</div>
							</div>
							{{/each}}`,
				template = Handlebars.compile(source),
				result = template(products);

			$( result ).appendTo( $(productsBlock) );
		}

		function paginate(e) {
			e && e.preventDefault();

			page++;
			$.ajax({
				method: "GET",
				headers: { "Accept" : "*/*" },
				url: searchUrl + "?page=" + page
			})
			.done(function(data) {
				// console.log(data);
				history.pushState({product: "paginationProduct"}, "", searchUrl + "?page=" + page);
				renderProducts(data.data);
			});
		}
	})();

	function QueryString() {
		// This function is anonymous, is executed immediately and
		// the return value is assigned to QueryString!
		var query_string = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		}
		return query_string;
	}

	// Форматированме цeны
	function priceSet(data){
		/*
		 * В переменной price приводим получаемую переменную в нужный вид:
		 * 1. принудительно приводим тип в число с плавающей точкой,
		 *    учли результат 'NAN' то по умолчанию 0
		 * 2. фиксируем, что после точки только в сотых долях
		 */
		var price       = Number.prototype.toFixed.call(parseFloat(data)),
		//заменяем точку на запятую
			price_sep   = price.replace(/(\D)/g, ","),
		//добавляем пробел как разделитель в целых
			price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

		return price_sep;
	};
	
	// Опустит вниз футер даже если контейнер пустой
	;(function setFooter() {
		var footer = document.querySelector('footer'),
			container = document.querySelector('body > .container'),
			height = window.innerHeight,
			heightHeader = document.querySelector('header').offsetHeight,
			footerHeight = footer.offsetHeight;
		
		$(container).css({
			'min-height' : height - footerHeight - heightHeader + 'px'
		});
	})();

	// localStorage.removeItem( 'products' );

});
