var app = angular.module('goApp', []);

app.controller('goCtrl', function($scope, $http, goService, alertService) {
	$scope.init = function() {
		$scope.towns = ['МОСКВА'];
		$scope.lastLetter = 'А';
		$scope.town = '';
		$scope.player_win = false;
	};
	
	$scope.init();
	
	$scope.newMove = function() {
		alertService.clearAlerts();
		
		if ($scope.player_win) {
			return;
		}
		
		if (!$scope.town) {
			alertService.addAlert('не введен город', 'alert-danger');
			
			return;
		}
	
		var result = '';
		goService.newMove($scope.town, $scope.towns.join(',')).then(function(data) {
			var state = data.data.state;
			
			switch (state) {
				case 'wrong_letter':
					alertService.addAlert('город должен начинаться с буквы ' + $scope.lastLetter, 'alert-danger');
					
					break;
					
				case 'unknown_town':
					alertService.addAlert('город нам не известен, не пойдёт', 'alert-danger');
					
					break;
					
				case 'new_town':
					$scope.towns.push($scope.town);
					$scope.towns.push(data.data.town);
					$scope.town = '';
					$scope.lastLetter = data.data.last_letter;
					
					break;
					
				case 'already_entered_town':
					alertService.addAlert('этот город уже называли', 'alert-danger');
					
					break;
					
				case 'lost':
					$scope.towns.push($scope.town);
					$('#modalwin').modal('show');
					$scope.player_win = true;
					
					break;
					
				default:
					;
			}
			
			$('#town').focus();
		});
	};
});

app.factory('goService', function($http) {
	var goService = {
		newMove: function(town, entered) {
			return $http.post('go.php', {town: town, entered: entered});
		}
	};
	
	return goService;
});

app.controller('alertCtrl', function($scope, alertService) {
	$scope.alerts = alertService.alerts;
});

app.factory('alertService', function($rootScope) {
	var alertService = {
		alerts: [],
		
		addAlert: function(text, type) {
			this.alerts.push([text, type]);
		},
		
		clearAlerts: function() {
			this.alerts.splice(0, this.alerts.length);
		}
	};
	
	return alertService;
});

$(document).ready(function() {
	$('#town').focus();
});