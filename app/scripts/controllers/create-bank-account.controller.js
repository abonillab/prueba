(function(){
  'use strict';

angular.module('accountOpenningFrontendApp')
  .controller('CreateBankAccountController', function ($scope, $location, $timeout, bankAccountService) {

    var handleSuccess = function(data) {
      console.log('Success');
      console.log(data);
    };

    var handleErr = function(err) {
      console.error(err);
    }

    bankAccountService.finish().then(handleSuccess, handleErr);
    $timeout(function() {
       $location.url('/finish');
    }, 3000);

  });
})()

