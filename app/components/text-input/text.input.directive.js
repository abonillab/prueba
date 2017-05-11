(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('textInput', textInput);
    function textInput() {
      return {
          restrict:'E',
          templateUrl:'components/text-input/text_input_template.html',
          scope: {
            "nextUrl": "@nextUrl",
            "param": "@param",
            "label": "@label",
            "errorMessage": "@errorMessage",
            "inputId": "@inputId",
            "buttonId": "@buttonId",
            "max": "@max",
            "min": "@min",
            "directives": "@directives"
          },
          controller: function($scope, $location, bankAccountService) {

            $scope.nextStep = function() {
              $scope.formSubmitted = true;
              $scope.validate();
              if ($scope.hasError) return false;
              bankAccountService.save($scope.param, $scope.value);
              $location.url($scope.nextUrl);
            }

            $scope.validate = function() {
            	$scope.hasError = false;
            	if ( validateMinMax() !== true ) $scope.hasError = true;
            }
            
            function validateMinMax(){
            	if( $scope.value !== undefined ) {
            		if( $scope.min !== undefined && $scope.value.length < $scope.min ) {
            			return false;
            		 }
            		
            		if( $scope.max !== undefined && $scope.value.length > $scope.max ) {
            			return false;
            		 }
            	} else {
            		if( $scope.min !== undefined && $scope.min > 0 ) {
            			return false;
            		 }
            	}
            	return true;
            }
            
            $scope.hasError = false;
          }
      };
    }
 })();
