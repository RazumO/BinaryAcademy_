(function () {
	var bigPhoto = document.getElementById("big-photo");
	console.log(bigPhoto);
	bigPhoto.addEventListener('click', function (e) {
		bigPhoto.style.display = 'none';
	});
	document.getElementById('table').style.height = (screen.height - 100) + 'px';
	document.getElementById('table-cell').style.height = (screen.height - 100) + 'px';
	console.log(screen.height);
})();


angular.module('app', ['ngResource'])

	.factory('httpService', function($http){
		_takePhotos = function (handleSuccess) {
				return $http.get('http://jsonplaceholder.typicode.com/photos').then(handleSuccess);
		}
		return {
			takePhotos: _takePhotos
		}
	})

	.factory('resourceService', function($resource){
		_takePhotos = function (handleSuccess) {
			var template = $resource('http://jsonplaceholder.typicode.com/:type', {type: '@type'});
			return template.query({type: 'photos'} , handleSuccess);
		}
		return {
			takePhotos: _takePhotos
		}
	})

	.directive('showBigPhoto', function() {
		var bigPhoto = document.getElementById("big-photo");
		var bigPhotoImg = document.getElementById("big-photo-img");
		return {
			link: function(scope, element, attr) {
				var length = element.length;
				for (var i = 0; i < length; i++) {
					element[i].addEventListener('click', function (e) {
						var url = this.getAttribute('data-url');
						console.log(url);
						bigPhotoImg.setAttribute('src', url);
						bigPhoto.style.display = 'block';
					});
				}
			}
		};
	})

	.controller('photosController', function($scope, $http, $resource, httpService, resourceService){
		var vm = this;

	 	var handleSuccess = function (response) {
	 		vm.photos = response.data||response;
			vm.tenPhotos = vm.photos.slice(0, 10);
			console.log(vm.tenPhotos);
	 	}

	 	//httpService.takePhotos(handleSuccess);
	 	resourceService.takePhotos(handleSuccess);
	});