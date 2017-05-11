(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').directive('inputRadio', suggestList);
	
	function suggestList() {
		return {
			restrict : 'E',
	        template : "Hola {{customCtrl.mensaje}} !!!"
		};
	}
})();