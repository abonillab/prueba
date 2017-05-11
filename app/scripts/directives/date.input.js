(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').directive('dateMask', function() {
		return {
			require : 'ngModel',
			link : function(scope, element, attrs, modelCtrl) {
        $(element).inputmask("99/99/9999", {placeholder: 'DD/MM/AAAA' });
			}
		};
	});
})();
