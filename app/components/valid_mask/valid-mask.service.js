(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').factory('cedValidMask', cedValidMask);

	cedValidMask.$inject = [ '$log' ];

	function cedValidMask($log) {

		var EMAIL_REGEXP = /^[_\w0-9]+(\.[_\w0-9]+)*@[\w0-9-]+(\.[\w0-9-]+)*(\.[\w]{2,4})$/;
		var CELLPHONE = /^\(\d{3}\) \d{3} \d{4}$/;
		var PHONE_ = /^\(\d{1}\) \d{3} \d{4}$/;

		var service = {
			isValidMail : isValidMail,
			isValidCellPhone : isValidCellPhone,
			isValidPhone : isValidPhone
		};
		return service;



		function isValidMail(email) {
			return EMAIL_REGEXP.test(email);
		}

		function isValidCellPhone(cellphone) {
			return CELLPHONE.test(cellphone);
		}

		function isValidPhone(phone) {
			return PHONE_.test(phone);
		}
		
	}
	;
})();