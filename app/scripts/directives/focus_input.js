(function () {
  angular.module('accountOpenningFrontendApp')
  .directive('inputFocus', inputFocus);
  function inputFocus() {
    return {
      restrict:'A',
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
       scope.$watch(attrs.inputFocus,function(hasError){   
          var value  = scope.$eval(attrs.focusError);
          if(value)
            element[0].focus();
        })
      }
    };
  }


})();