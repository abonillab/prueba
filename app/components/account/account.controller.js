(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').controller('AccountController', AccountController);

	AccountController.$inject = [ '$scope', 'cedAccountData', '$location', 'bankAccountService' ];

	function AccountController($scope, cedAccountData, $location, bankAccountService) {

	  $scope.firstName = bankAccountService.getPayload().firstName;

		getAccountsInfo();

		$scope.nextStep = function(accountType) {
		  bankAccountService.save('accountType', accountType);
		  $location.url('/identity_number');
		}

		function getAccountsInfo() {
			cedAccountData.getAccountsInfo().then(function(data) {
				$scope.accountsList = data;
				console.log(data);
			});
		}
	}
})();
