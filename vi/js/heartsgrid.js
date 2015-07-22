angular.module('Hearts')
.directive('heartsgrid', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      ngModel: '='
    },
    templateUrl: 'heartsgrid.html'
  };
});