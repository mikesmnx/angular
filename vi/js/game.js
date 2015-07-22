angular.module('Game', ['Task', 'Keyboard', 'Hearts'])
.service('GameManager', function(TaskService, KeyboardService, HeartsService) {
	this.task = '';
	this.keyboard = [];
	this.hearts = 0;
	
	// адрес, по которому наш node-скриптик отдает случайные слова для заданий
	TaskService.task_url = 'http://localhost:8888';
	
	// начинает игру
	this.newGame = function() {
		KeyboardService.keyInit();
		TaskService.setTask();
		HeartsService.hearts = 6;
		
		this.task = TaskService.task;
		this.keyboard = KeyboardService.keys;
		this.hearts = HeartsService.hearts;
	};
	
	// клик по экранной клавиатуре
	this.click = function(num) {
		KeyboardService.keys[num].disabled = true;
		var res = TaskService.openLetter(KeyboardService.keys[num].value);
		
		if (!res) {
			this.hearts = HeartsService.decreaseHearts();
			
			if (this.hearts < 1) {
				$('#modallost').modal('show');
				
				TaskService.openTask();
				KeyboardService.disableAll();
			}
		}
		
		if (this.hearts > 0 && TaskService.taskSolved()) {
			$('#modalwin').modal('show');
			
			TaskService.openTask();
			KeyboardService.disableAll();
		}
	};
	
	this.newGame();
});

