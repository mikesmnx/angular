// работа с экранной клавиатурой

angular.module('Keyboard', [])
.controller('KeyboardController', function($scope, KeyboardService, GameManager) {
	$scope.click = function(num) {
		GameManager.click(num);
	};
})
.service('KeyboardService', function() {
	this.keys = [];
	
	this.keyInit = function() {
		this.keys = [
			{ disabled: false, value: 'А' },
			{ disabled: false, value: 'Б' },
			{ disabled: false, value: 'В' },
			{ disabled: false, value: 'Г' },
			{ disabled: false, value: 'Д' },
			{ disabled: false, value: 'Е' },
			{ disabled: false, value: 'Ж' },
			{ disabled: false, value: 'З' },
			{ disabled: false, value: 'И' },
			{ disabled: false, value: 'Й' },
			{ disabled: false, value: 'К' },
			{ disabled: false, value: 'Л' },
			{ disabled: false, value: 'М' },
			{ disabled: false, value: 'Н' },
			{ disabled: false, value: 'О' },
			{ disabled: false, value: 'П' },
			{ disabled: false, value: 'Р' },
			{ disabled: false, value: 'С' },
			{ disabled: false, value: 'Т' },
			{ disabled: false, value: 'У' },
			{ disabled: false, value: 'Ф' },
			{ disabled: false, value: 'Х' },
			{ disabled: false, value: 'Ц' },
			{ disabled: false, value: 'Ч' },
			{ disabled: false, value: 'Ш' },
			{ disabled: false, value: 'Щ' },
			{ disabled: false, value: 'Ъ' },
			{ disabled: false, value: 'Ы' },
			{ disabled: false, value: 'Ь' },
			{ disabled: false, value: 'Э' },
			{ disabled: false, value: 'Ю' },
			{ disabled: false, value: 'Я' }
		];
	};
	
	this.disableAll = function() {
		for (var k in this.keys) {
			this.keys[k].disabled = true;
		}
	};
	
	this.keyInit();
});
