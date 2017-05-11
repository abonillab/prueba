(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').factory('cedContactData', cedContactData);

	cedContactData.$inject = [ '$http', '$log' ];

	function cedContactData($http, $log) {

		var service = {
			getCities : getCities
		};
		return service;

		function getCities() {
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