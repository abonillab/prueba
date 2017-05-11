(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller(
			'OccupationController', OccupationController);

	OccupationController.$inject = [ '$scope', '$location',
			'bankAccountService', 'cedOccupationData', '$rootScope' ,'cedValidMask'];

	function OccupationController($scope, $location, bankAccountService,
			cedOccupationData, $rootScope, cedValidMask) {

		getOccupationInfo();
		getTypePhone();
		
		$scope.phoneCompany="hola mundo";
		
		
		$scope.seleccionarOcupacion = function(occupation){
			$scope.occupation = occupation; 
		}
		
		var ocupacion = bankAccountService.getPayload()['occupation'];
		$scope.firstName = bankAccountService.getPayload()['firstName'];


		bankAccountService.getPayload()['cellphone'];

		$scope.livingCityQuestion = {
			titulo : "Ciudad de residencia:",
			message : bankAccountService.getPayload()['city'],
			icono : "images/briefcase@2x.png"
		};
		
		$scope.occupationQuestion = {
				titulo : "Ocupación actual:",
				message : bankAccountService.getPayload()['occupation'],
				icono : "images/briefcase@2x.png"
			};
		
		$scope.nameCompanyQuestion = {
				titulo : "Nombre de la Empresa:",
				message : bankAccountService.getPayload()['nameCompany'],
				icono : "images/location-pin@2x.png"
			};
		
		$scope.cityCompanyQuestion = {
				titulo : "Ciudad dónde trabajas:",
				message : bankAccountService.getPayload()['cityCompany'],
				icono : "images/call-end@2x.png"
			};

		$scope.continueOccupation = function() {
			if ($scope.formBasic.$invalid) {
				$scope.error = "error-msg";
				return false;
			} else {
				$scope.error = "";
				if ($scope.occupation == "Independiente") {
					$location.url('/mainActivity');
				} else if ($scope.occupation == "Asalariado") {
					// Guardar un CIUU 0010 para otras actividades
					$location.url('/companyName');
				} else {
					// Guardar un CIUU 0010 para otras actividades
					$location.url('/monthlyIncome');
				}

			}

		}

		$scope.continueMainActivity = function() {
			// $scope.flap = !$scope.flap;
			if (ocupacion == "Independiente") {
				$location.url('/monthlyIncome');
			} else {
				$location.url('/companyName');
			}

		}

		$scope.continueCompanyName = function() {
			$location.url('/companyCity');
		}

		$scope.continueCompanyCity = function() {
			$location.url('/companyPhone');

		}

		$scope.continueCompanyPhone = function() {
			console.log($scope.phoneCompany);
			
			$scope.isValidCellPhone = cedValidMask.isValidCellPhone($scope.numberPhoneCompany);
			$scope.isValidPhone = cedValidMask.isValidPhone($scope.numberPhoneCompany);
			$scope.msnError = "";

			
			if ($scope.phoneCompany == 'phone' && !$scope.isValidPhone) {
				$scope.error = "error-msg";
				$scope.msnError = "Telefono Fijo Inválido";
				return false;
			} else if($scope.phoneCompany == 'cellPhone' && !$scope.isValidCellPhone) {
				$scope.error = "error-msg";
				$scope.msnError = "Celular Invalido";
				return false;
			} 
			else {
				$scope.error = "";
				$location.url('/monthlyIncome');
			}
		}

		$scope.$on('$locationChangeStart', function() {
			bankAccountService.saveInputData($scope);
		});

		function getOccupationInfo() {
			console.log(cedOccupationData);
			cedOccupationData.getOccupationInfo().then(function(data) {
				$scope.occupationList = data;
				console.log(data);
			});
		};
		
		function getTypePhone() {
			cedOccupationData.getTypePhone().then(function(data) {
				$scope.listTypePhone = data;
				$scope.optionPhone = $scope.listTypePhone[0];
				$scope.optionCellPhone = $scope.listTypePhone[1];
				console.log(data);
			});
		};
	}
})();
