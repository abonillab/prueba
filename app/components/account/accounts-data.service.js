(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').factory('cedAccountData', cedAccountData);

	cedAccountData.$inject = [ '$http', '$log' ];

	function cedAccountData($http, $log) {

		var service = {
			getAccountsInfo : getAccountsInfo
		};
		return service;

		function getAccountsInfo() {
			return $http.get('components/account/accounts.json').then(handleReturn, handleError);

			function handleReturn(response) {
				return response.data;
			}

			function handleError(response) {
				// TODO
				$log.error(response);
			}
		}
		;
	}
	;
})();
