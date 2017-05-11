(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('booleanInput', function () {
       return {
         restrict:'E',
         templateUrl:'components/boolean-input/template.html',
         scope: {
           "nextUrl": "@nextUrl",
           "param": "@param",
           "label": "@label",
           "psNote": "@psNote"
         },
         controller: function($scope, $location, bankAccountService) {
           $scope.nextStep = function(value) {
             bankAccountService.save($scope.param, value);
             $location.url($scope.nextUrl);
           }
         }
       };
      });

 })();
