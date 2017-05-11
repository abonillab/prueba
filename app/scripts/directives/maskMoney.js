(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('moneyMask', formatoNumeros)
    .directive('maxCurrency', ValidateRangeCurrency)
    .directive('minCurrency', ValidateRangeCurrency);
    function formatoNumeros() {
         return {
        restrict: 'A',
         require: 'ngModel',
        link: function(scope, element,attrs,ctrl){
         
          $(element).inputmask("numeric", {
            radixPoint: ".",
            groupSeparator: ",",
            digits: 0,
            autoGroup: true,
            prefix: '',
            rightAlign: false,
            negationSymbol: {
                front: "",
                back: ""
            },
            oncleared: function () {
             if(self.value){
                 self.Value(''); 
             }
            
            }
            });

           element.on('keypress', function (e) {
           ctrl.$parsers.push(function(data) {
                  if (element.val() == null || element.val().trim() == "")
                        return false
                    var output = element.val();
                     var valormodel = output.replace(/\,/g,'');
                  return valormodel; 
                });
              });

           }
        }
    }

    ValidateRangeCurrency.$inject = ['controlService'];
    function ValidateRangeCurrency(controlService) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('blur', function (e) {
                    if (elm.val() == null || elm.val().trim() == "")
                        return false
                    var output = elm.val();
                    output = parseInt(controlService.setNumber(output));
                    ctrl.$invalid = false;
                    ctrl.$error.rangecurrency = false;
                    ctrl.$error.msg = "";
                    if (output > parseInt(attrs.maxCurrency)) {
                        var msg = 'El valor maximo permitido es ' + controlService.setCurrency(attrs.maxCurrency);
                        ctrl.$invalid = true;
                        ctrl.$error.rangecurrency = true;
                        ctrl.$error.msg = msg;
                    } else if (output < parseInt(attrs.minCurrency)) {
                        var msg = 'El valor mínimo permitido es ' + controlService.setCurrency(attrs.minCurrency);
                        ctrl.$invalid = true;
                        ctrl.$error.rangecurrency = true;
                        ctrl.$error.msg = msg;
                    }
                });
            }
        };
    }
   

 })();
