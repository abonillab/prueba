(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller('IdentityController', IdentityController);

	IdentityController.$inject = [ '$scope', '$rootScope' ,'$location', '$routeParams','$document', '$timeout','bankAccountService'];

	function IdentityController($scope, $rootScope,$location, $routeParams,$document, $timeout, bankAccountService) {
    	$scope.flap  = false;
       $scope.listReq = {};
        $scope.listReq.titulo="Cuenta Seleccionada:";
        $scope.listReq.message = $routeParams.accountType;
        $scope.listReq.icono="images/emoticon-happy@2x.png";

		$scope.$on('$locationChangeStart', function() {
			if ($routeParams.accountType) {
				$scope.listReq.message = $routeParams.accountType;
			}
			bankAccountService.saveInputData($scope);
		});
		$scope.continue_indentity = function() {
            $scope.flap = !$scope.flap;

			//$scope.formBasic.$submitted = true;
			if ($scope.formBasic.$invalid) {
				$scope.error = "error-msg";
				return false;
			} else {
				$scope.error = "";
				$location.url('/first-name');
			}

		}



	}


})();

