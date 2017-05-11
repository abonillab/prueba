(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('lastRequest', mainTemplate);
    function mainTemplate() {
        return {
            restrict:'E',
            templateUrl:'views/main.directive.template.html',
            scope: true,
            replace: true,
            link: function (scope, element, attrs, modelCtrl) {
                  if(attrs.lista){
                    if(JSON.parse(attrs.lista).filter){
                        scope.lista = {
                            message : JSON.parse(attrs.lista).message+"|"+JSON.parse(attrs.lista).filter,
                            icono :  JSON.parse(attrs.lista).icono,
                            titulo : JSON.parse(attrs.lista).titulo
                        }

                  }else{
                        scope.lista = JSON.parse(attrs.lista);
                    }
                  }
                  
                  }

                    
            
        };
    }
    

 })();