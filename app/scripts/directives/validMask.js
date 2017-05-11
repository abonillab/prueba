(function () {
    'use strict';

    angular
        .module('accountOpenningFrontendApp')
        .factory('controlService', ControlService);

    ControlService.$inject = ['$timeout'];
    function ControlService($timeout) {

        function setCurrency(val) {
            if (!val || val == null || val.trim() == "")
                return "$0";
            var valor = val || 0;
            valor = parseFloat(valor) || 0;
            var output = valor + '';
            var digits = output.split('.')[0].match(/\d+/g).join('');
            var formatted = digits.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            var string = '$' + formatted + '';
            return string;
        }

        function setDollar(val) {
            if (!val || val == null || val.trim() == "")
                return "USD0.00";
            var valor = val || 0;
            valor = parseFloat(valor) || 0;
            var output = valor + '';
            var digits = output.split('.')[0].match(/\d+/g).join('');
            var formatted = digits.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            var string = 'USD' + formatted + '.00';
            return string;
        }

        function setPercentage(val) {
            if (!val || val == null || val.trim() == "")
                return "0%";
            var valor = val || 0;
            valor = parseFloat(valor) || 0;
            var output = valor + '';
            var digits = output.split('.')[0].match(/\d+/g).join('');
            var formatted = digits.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            var string = '%' + formatted;
            return string;
        }

        function setNumber(val) {
            if (!val || val == null || val.trim() == "")
                return "";
            var valor = val || 0;
            var output = valor + '';
            var digits = output.split('.')[0].match(/\d+/g);
            if (digits == null)
                return "";
            digits = digits.join('');
            var string = digits;
            return string;
        }
        return {
            setCurrency: setCurrency,
            setDollar: setDollar,
            setPercentage: setPercentage,
            setNumber: setNumber
        }
    }

})();