(function() {
	angular.module('accountOpenningFrontendApp').directive('maskPhone',
			maskPhone);

	function maskPhone() {
		return {
			restrict : 'A',
			scope : {
				maskPhone : '='
			},
			link : function(scope, element, atributos) {
				if (atributos.maskPhone == "cellPhone") {
					$(element).inputmask({
						"mask" : "(399) 999 9999",
						placeholder : "(3__) ___ ____",
						prefix : "3"
					});
				} else {
					$(element).inputmask({
						"mask" : "(9) 999 9999",
						placeholder : "(_) ___ ____"
					});
				}

			}
		}
	}
})();