angular.module('Keyboard')
.directive('keyboardgrid', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'keyboard.html'
  };
});
