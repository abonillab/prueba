(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller('BasicInformationController', BasicInformationController);

	BasicInformationController.$inject = [ '$scope', '$rootScope', 'bankAccountService', '$location'];

	function BasicInformationController($scope, $rootScope, bankAccountService, $location) {

		$scope.optionM = {};
		$scope.optionM.name="Masculino";
		$scope.optionM.value="M";
		$scope.optionF = {};
		$scope.optionF.name="Femenino";
		$scope.optionF.value="F";

		$scope.identificationNumberQuestion = {
			titulo : "Número de cédula:",
			message : bankAccountService.getPayload()['identityNumber'],
			icono : "images/emoticon-happy@2x.png"
		};

		$scope.firstNameQuestion = {
			titulo : "Primer nombre:",
			message : bankAccountService.getPayload()['firstName'],
			icono : "images/emoticon-happy@2x.png"
		};

		$scope.middleNameQuestion = {
			titulo : "Segundo nombre:",
			message : bankAccountService.getPayload()['middleName'],
			icono : "images/emoticon-happy@2x.png"
		};

		$scope.lastNameQuestion = {
			titulo : "Primer apellido:",
			message : bankAccountService.getPayload()['lastName'],
			icono : "images/emoticon-happy@2x.png"
		};

		$scope.birthPlaceQuestion = {
			titulo : "Ciudad de nacimiento",
			message : bankAccountService.getPayload()['birthPlace'],
			icono : "images/emoticon-happy@2x.png"
		};

		$scope.validateAndContinue = function (url) {
			if ($scope.formBasic.$invalid) {
				$scope.error = "error-msg";
				return false;
			} else {
				$scope.error = "";
				$location.url(url);
			}
		}

		$scope.$on('$locationChangeStart', function() {
			bankAccountService.saveInputData($scope);
		});

	}
})();
