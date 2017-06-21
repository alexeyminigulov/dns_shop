'use strict';

module.exports = function ($parse){

	return {
		restrict: 'A',
		scope: {
			canvasDrawImage : '=canvasDrawImage'
		},

		link: function (scope, elements, attrs) {
			if(!scope.canvasDrawImage)
				return;

			var canvas = elements[0],
				height = 55;
			drawCanvas(scope.canvasDrawImage)

			function drawCanvas(file){

				var ctx = canvas.getContext('2d');
				ctx.mozImageSmoothingEnabled = true;
				ctx.webkitImageSmoothingEnabled = true;
				ctx.msImageSmoothingEnabled = true;
				ctx.imageSmoothingEnabled = true;

				canvas.setAttribute('width',height);
				canvas.height = height;

				var img = new Image();
				img.onload = function () {

					var pog = img.width / img.height;
					ctx.drawImage(img, 0, 0, img.width, img.height,
									0, 0, canvas.width, canvas.height/pog);
				};
				img.src = URL.createObjectURL(file);
			}
		}
	};

};