(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').directive('alphaInput', function() {
		return {
			require : 'ngModel',
			link : function(scope, element, attrs, modelCtrl) {
				
				Inputmask.extendDefinitions({
				    'a': { 
				        validator: "[A-Za-zñÑáéíóúÁÉÍÓÚ ]",
				        cardinality: 1
				    }
				});
				
				$(element).inputmask({
					"mask" : "(a{*} ){*}",
					placeholder : ""
				});
			}
		};
	});
})();