(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('numMask', formatoNumeros);
    function formatoNumeros() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                var numInput = function (inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var inputValFormat = formatNumSet(inputValue);
                    if (inputValue !== inputValFormat) {
                        modelCtrl.$setViewValue(inputValFormat);
                        modelCtrl.$render();
                    }
                    return inputValFormat;
                }
                modelCtrl.$parsers.push(numInput);
            }
        };
    }
    function formatNumSet(val) {
        return val.replace(/\D/g, "")
       .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    }

 })();