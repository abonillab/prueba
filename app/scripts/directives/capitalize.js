(function() {
	'use strict';
	angular.module('accountOpenningFrontendApp').directive('capitalize', function() {
		return {
			require : 'ngModel',
			link : function(scope, element, attrs, modelCtrl) {
				var capitalize = function(inputValue) {
					if (inputValue != undefined){
						var capitalized = "";
						var splitted = inputValue.split(" ");
						if(splitted && splitted.length > 0){
							for(var i=0; i< splitted.length; i++){
								var s1 = splitted[i].substr(0,1).toUpperCase();
								var s2 = splitted[i].substr(1,splitted[i].length).toLowerCase();
								splitted[i] = (s1+s2);
							}
							capitalized = splitted.join(" ");
						}
						if (capitalized !== inputValue) {
							modelCtrl.$setViewValue(capitalized);
							modelCtrl.$render();
						}
					}
					return capitalized;
				}
				modelCtrl.$parsers.push(capitalize);
				capitalize(scope[attrs.ngModel]);
			}
		};
	});
})();