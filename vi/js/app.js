angular.module('viApp', ['Game', 'Task', 'Keyboard', 'Hearts'])
.controller('GameController', function(GameManager, TaskService, KeyboardService) {
	this.game = GameManager;
	
	this.newGame = function() {
		GameManager.newGame();
	};
	
	this.openTask = function() {
		TaskService.openTask();
		KeyboardService.disableAll();
	};
});