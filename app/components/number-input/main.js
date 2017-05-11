(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('numberInput', numberInput);
    function numberInput() {
      return {

          restrict:'E',
          templateUrl:'components/number-input/template.html',
          scope: {
            "nextUrl": "@nextUrl",
            "param": "@param",
            "label": "@label",
            "errorMessage": "@errorMessage",
            "maxYearsBehind": "@maxYearsBehind",
            "min": "@min",
            "max": "@max"
          },

          controller: function($scope, $location, bankAccountService) {

            $scope.updateHasError = function() {
              var min =  Math.pow(10, $scope.min -1);
              var max = Math.pow(10, $scope.max);
              var value = ($scope.value === undefined || $scope.value === '') ? 0 : parseInt($scope.value.replace('.', ''));
              console.log('Checking if ' + min + ' < ' + value + ' < ' + max);
              $scope.hasError = value < min || value > max;
            }

            $scope.nextStep = function() {
              $scope.formSubmitted = true;
              $scope.updateHasError();
              if ($scope.hasError) return false;
              bankAccountService.save($scope.param, $scope.value);
              $location.url($scope.nextUrl);
            }

            $scope.hasError = false;
          }
      };
    }
 })();
