'use strict';

import uirouter from 'angular-ui-router/release/angular-ui-router.min';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import uibootstrap from 'angular-ui-bootstrap';
import angularChart from 'angular-chart.js';

(() => {
	window.taTools = {};
	window.rangy = require('rangy/lib/rangy-core');
})();
import 'rangy/lib/rangy-selectionsaverestore';
import './../myLibs/js/textAngular-sanitize.min.js';
import 'textangular/dist/textAngularSetup.js';
import textAngular from './../myLibs/js/textAngular.js';

var app = angular.module("myApp", [ uirouter, ngAnimate, toastr, uibootstrap, textAngular, angularChart ]);

app.config([ '$urlRouterProvider', function($urlRouterProvider){
		$urlRouterProvider.otherwise("/dashboard");
} ]);

// services
app.factory('Configuration', require('./_services/configuration'));
app.factory('profileFactory', require('./_services/profileFactory'));
app.factory('CategoriesFactory', [ '$http', '$q', require('./categories/CategoriesFactory') ]);

// common
require('./_common/ms-toolbar')(app);
require('./_common/ms-sidenav')(app);
require('./_common/ms-layout')(app);
require('./_common/ms-bread-crumbs')(app);
require('./_common/ms-file-model')(app);
require('./_common/string-to-number')(app);
require('./_common/validator-price')(app);
require('./_common/custom-on-change')(app);
require('./_common/canvas-draw-image')(app);
require('./_common/filter-bytes')(app);

// modules
require('./dashboard')(app);
require('./users')(app);
require('./categories')(app);
require('./requisition')(app);
require('./type_products')(app);
require('./products')(app);
require('./supply')(app);
require('./lists_values')(app);
require('./units')(app);
require('./news')(app);
require('./profile/description')(app);
require('./profile/settings')(app);
require('./manufacturer')(app);


app.run([ '$rootScope', function($rootScope) {
	
	$rootScope.addAnimateLoading = function(selector) {
		var mainView = document.querySelector(selector);
		mainView.innerHTML = `<div class="spinner">
								<div class="dot1"></div>
								<div class="dot2"></div>
							</div>`;
	};
	$rootScope.hideLoading = function() {
		var mainView = document.querySelector('.main-view'),
			spinner  = mainView.querySelector('.spinner');
		if( !spinner ) return;

		Array.prototype.forEach.call( mainView.children, (element) => {
			$(element).css( {
				'display' : ''
			} );
		} );
		mainView.removeChild(spinner);
	};
} ]);