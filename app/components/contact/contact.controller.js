(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller('ContactController', ContactController);

	ContactController.$inject = [ '$scope', '$rootScope', 'cedAccountOpeningData','bankAccountService', '$location', 'cedValidMask' ];

	function ContactController($scope, $rootScope, cedAccountOpeningData, bankAccountService, $location, cedValidMask) {

		getMunicipiosCiudad();

		$scope.prevFechaNacimiento = {
	            titulo : "Fecha nacimiento:",
	            message : bankAccountService.getPayload()['birthdate'],
	            icono : "images/location-pin@2x.png"
	    };

		$scope.prevGenero = {
	            titulo : "Tu género:",
	            message : (bankAccountService.getPayload()['gender'] === 'M' ? 'Masculino' : 'Femenino'),
	            icono : "images/envelope@2x.png"
	    };


		$scope.prevEmail = {
	            titulo : "Tu correo electrónico:",
	            message : bankAccountService.getPayload()['email'],
	            icono : "images/phone@2x.png",
	            style : "emoji-phone"
	    };



		function getMunicipiosCiudad() {
			cedAccountOpeningData.getMunicipiosCiudad().then(function(data) {
				$scope.citiesList = data;
			});
		}


		$scope.mailValid = function() {
			$scope.formBasic.$submitted = true;
			$scope.validMail = cedValidMask.isValidMail($scope.email);
			if (!$scope.validMail) {
				$scope.error = "error-msg";
				return false;
			} else {
				$scope.error = "";
				$location.url('/cellphone/');
			}

		}

		$scope.ciudadValid = function() {

			$scope.formBasic.$submitted = true;
			if ($scope.formBasic.$invalid) {
				$scope.error = "error-msg";
				console.log($scope.formBasic);
				return false;
			} else {
				$scope.error = "";
				$location.url('/expeditionDate/');
			}

		}

		$scope.celularValid = function() {

			$scope.formBasic.$submitted = true;
			$scope.validCellPhone = cedValidMask.isValidCellPhone($scope.cellphone);
			if (!$scope.validCellPhone) {
				$scope.error = "error-msg";
				return false;
			} else {
				$scope.error = "";
				$location.url('/city');
			}

		}

		$scope.$on('$locationChangeStart', function() {
			bankAccountService.saveInputData($scope);
		});

				

	}
})();
