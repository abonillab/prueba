(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').factory('cedOccupationData',
			cedOccupationData);

	cedOccupationData.$inject = [ '$http', '$log' ];

	function cedOccupationData($http, $log) {
		
		function getOccupationInfo() {
			return $http.get('components/occupation/occupation.json').then(
					handleReturn, handleError);

			function handleReturn(response) {
				return response.data;
			}

			function handleError(response) {
				// TODO
				$log.error(response);
			}
		}
		
		function getTypePhone() {
			return $http.get('components/occupation/phone.json').then(
					handleReturn, handleError);

			function handleReturn(response) {
				return response.data;
			}

			function handleError(response) {
				// TODO
				$log.error(response);
			}
		}

		var service = {
			getOccupationInfo : getOccupationInfo,
			getTypePhone : getTypePhone

		};
		return service;
		

		
		
	
	}
	;
})();
