// контроллер жизней
// правильно заменить его на постепенно рисуемую виселицу, но в bootstrap пока нет таких глифов; сердечки есть

angular.module('Hearts', [])
.controller('HeartsController', function($scope) {
	$scope.range = function(n) {
		return new Array(n);
	};
})
.service('HeartsService', function() {
	this.hearts = 0;
	
	this.decreaseHearts = function() {
		this.hearts = this.hearts - 1;
		return this.hearts;
	};
});