(function(){
  'use strict';

/**
 * @ngdoc function
 * @name accountOpenningFrontendApp.controller:MainController
 * @description
 * # MainController
 * Controller of the accountOpenningFrontendApp
 */
angular.module('accountOpenningFrontendApp')
  .controller('MainController', function ($scope, $location, $routeParams, bankAccountService) {

    $scope.savedValues = bankAccountService.getPayload();

    $scope.initializeSelectAndChoseCedulaDeCiudadania = function() {
      var cedulaDeCiudadania = { id: 2, label: 'Cédula de ciudadanía' };
      $scope.identityTypes = [ cedulaDeCiudadania ];
      $scope.selectedIdentityType = cedulaDeCiudadania;
    }

    $scope.saveInputData = function() {
      if ($routeParams.accountType) {
        $scope.accountType = $routeParams.accountType;
      }
      bankAccountService.saveInputData($scope);
     }

    $scope.$on('$locationChangeStart', $scope.saveInputData);

    $scope.$on('$locationChangeStart', function() {
      if ($routeParams.accountType) {
        $scope.accountType = $routeParams.accountType;
      }
      bankAccountService.saveInputData($scope);
    });


    // TODO: better error layout
    $scope.finish = function() {
      bankAccountService.saveInputData($scope);
      bankAccountService.finish().then(
        function() { $location.url('/finish') },
        function() { alert('It was not possible to create your account: ') }
      );
    }

    $scope.continue_indentity = function() {

      $scope.formBasic.$submitted = true;
      if ($scope.formBasic.$invalid) {
        return false;
      } else {
        $scope.error = "";
        $location.url('/first-name');
      }

    }

  
    var confirmList = { 
        listConfirm : [
        {
        title : "Nombre completo",
        value : $scope.savedValues.firstName+" "+$scope.savedValues.middleName+" "+$scope.savedValues.lastName+" "+$scope.savedValues.secondLastName
      },
        {
        title : "",
        value : ""
      },{
        title : "Numero de cedula",
        value : $scope.savedValues.identityNumber
      },{
        title : "Fecha de expedicion",
        value : $scope.savedValues.expeditionDate
      },{
        title : "Ciudad de nacimiento",
        value : $scope.savedValues.borncity
      },{
        title : "Fecha de nacimiento",
        value : $scope.savedValues.birthDate
      },{
        title : "Correo electronico",
        value : $scope.savedValues.email
      },{
        title : "Telefono celular",
        value : $scope.savedValues.cellphone
      }
    ]
  }
  $scope.confirmList = confirmList;

      
    

    // initialize controller
    $scope.initializeSelectAndChoseCedulaDeCiudadania();
    $scope.saveInputData();
  });
})();
