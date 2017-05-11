(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('inputMask', formatoNumeros);
    function formatoNumeros() {
         return {
        restrict: 'A',
        scope: {
          inputMask: '='
        },
        link: function(scope, element){
         
          $(element).inputmask("numeric", {
            radixPoint: "#.###.###.###",
            groupSeparator: ".",
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
           }
        }
    }
   

 })();