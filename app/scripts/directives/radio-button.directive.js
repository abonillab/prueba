(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').directive('radioButton',
			function() {
				return {
					templateUrl : 'views/radio_button_template.html',
					scope: {
						option1: "=option1",
						option2: "=option2",
						phoneCompany: "=model"
					}
				};
			});
})();