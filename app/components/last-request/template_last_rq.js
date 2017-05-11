(function () {
    angular.module('accountOpenningFrontendApp')
.filter('mainFilter', ['$filter', function($filter) {
      return function(input, filterName) {        
           var  objfilter= filterName.split(":");
           return $filter(objfilter[0])(input, objfilter[1], objfilter[2]);
                
      };
   }])
.directive('lastRequestNew', mainTemplate);
    function mainTemplate() {
        return {
            restrict:'E',
            templateUrl:'components/last-request/main.directive.template.html',
            scope: true,
            link: function (scope, element, attrs, modelCtrl) {
               scope.lista = attrs;
            }
        };
    }
 })();