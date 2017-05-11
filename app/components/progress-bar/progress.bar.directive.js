(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').directive('progressBar', function() {
		return {
			restrict : 'E',
			scope:{
				title : "=?",
				second : "=?",
				active : "=?"
			},
			link : function(scope, element, attrs, modelCtrl) {
				scope.getClasses = function(order){

					var basicClasses = 'step';
					var ret =  scope.active == order ? basicClasses + ' selected' : order < scope.active ? basicClasses + ' complete' : basicClasses + ' normal';
					console.log("step "+ ret);
					return ret;
				}				
			},
			templateUrl : 'components/progress-bar/progress_bar_template.html'
		};
	});
})();