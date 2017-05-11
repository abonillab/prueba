(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller('nextIdentity', NextIdentity);

	NextIdentity.$inject = [ '$scope', '$rootScope' ,'$location', '$routeParams','$document', '$timeout','bankAccountService'];

	function NextIdentity($scope, $rootScope,$location, $routeParams,$document, $timeout, bankAccountService) {

		$scope.listReq = {};
		$scope.listReq.titulo="Tu c\xe9dula de ciudadan\xeda:";
        $scope.listReq.message = $routeParams.identityNumber;
        $scope.listReq.icono="images/emoticon-happy@2x.png";


        $scope.$on('$locationChangeStart', function() {
        	if ($routeParams.accountType) {
        		$scope.listReq.message = $routeParams.accountType;
        	}
        	bankAccountService.saveInputData($scope);
        });




    }


})();

