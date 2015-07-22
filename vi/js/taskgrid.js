angular.module('Task')
.directive('taskgrid', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'taskgrid.html'
  };
})
.directive('keyboard', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'keyboard.html'
  };
});
