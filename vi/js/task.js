angular.module('Task', [])
.service('TaskService', function($http) {
	this.task = [];
	this.task_url = '';
	
	// открывает букву в задании, если она конечно там есть
	this.openLetter = function(letter) {
		var result = false;
		
		for (var k in this.task) {
			if (this.task[k].value === letter) {
				this.task[k].opened = true;
				result = true;
			}
		}
		
		return result;
	};
	
	// открывает все задание целиком
	this.openTask = function() {
		for (var k in this.task) {
			this.task[k].opened = true;
		}
	};
	
	// setTask и getTask делают ровно то, что должны :-)
	this.setTask = function() {
		self = this;
	
		this.getTask().then(function(data) {
			this.task = [];
			
			str = data.data;
				
			self.task.length = 0;

			var letters = str.split('');
	
			for (var k in letters) {
				self.task.push({'value': letters[k], 'opened': false});
			}
		});
	};
	
	this.getTask = function() {
		return $http.get(this.task_url);
	};
	
	
	// проверка на то, что задание уже отгадано целиком
	this.taskSolved = function() {
		for (var k in this.task) {
			if (this.task[k].opened == false) {
				return false;
			}
		}
		
		return true;
	};
});