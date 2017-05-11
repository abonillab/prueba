(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').factory('cedAccountOpeningData', cedAccountOpeningData);

	cedAccountOpeningData.$inject = [ '$http', '$log' ];

	function cedAccountOpeningData($http, $log) {

		var service = {
			getMunicipiosCiudad : getMunicipiosCiudad
		};
		return service;

		function getMunicipiosCiudad() {
			return $http.get('components/commons/cities.json').then(handleReturn, handleError);

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