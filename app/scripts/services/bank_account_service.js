'use strict';

angular.module('accountOpenningFrontendApp').service('bankAccountService', function($http, $sessionStorage) {

    console.log('Data will be sent to server at ' + ENV.apiEndpoint);

    initializePayload();

    var requiredFields = [
      'accountType',
      'assetsDeclarationFile',
      'selfieFile',
      'lastName',
      'secondLastName',
      'firstName',
      'middleName',
      'gender',
      'email',
      'bornCity',
      'birthday',
      'expeditionDate',
      'birthdate',
      'identityType',
      'expeditionCity',
      'identityNumber',
      'livingCity',
      'state',
      'cellphone',
      'occupation',
      'jobActivity',
      'jobActivityCode',
      'employeeName',
      'employeeAddress',
      'employeeState',
      'employeePhone',
      'monthlyIncome',
      'monthlyOutcome',
      'totalAssets',
      'totalDebts',
      'hasAuthorizedRiskCheck',
      'hasForeignMoneyOperations',
      'nameCompany',
      'cityCompany',
      'mainActivity',
      'numberPhoneCompany'
    ]

    //TODO: convert dates before send
//            $scope.backendFormat = function(dateString) {
//              return moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD");
//            }

    // this is going to be deprecated
    this.saveInputData = function(scope) {
      if (scope.selectedIdentityType) {
        scope.identityType = scope.selectedIdentityType.label;
      }
      requiredFields.forEach(function(field){
        setPayloadValue(field, scope[field]);
      });
    }

    this.save = function(field, value) {
      setPayloadValue(field, value);
    }

    this.finish = function() {
      // just for mock
      fillPayloadWithMockValues(this.getPayload());

      // print error message if there is a parameter not filled
      checkPayload(this.getPayload());

      var url = ENV.apiEndpoint + '/bankAccounts';
      var serializedPayload = serializePayload($sessionStorage.payload);
      return postPayload(url, serializedPayload);
    }

    //---------------------------------------------------
    //                  helper methods
    //---------------------------------------------------

    function initializePayload() {
      $sessionStorage.payload = $sessionStorage.payload || {};
    }

    function postPayload(url, serializedPayload) {
      console.log("[bankAccountService] Sending to " + url + " the payload " + JSON.stringify($sessionStorage.payload));
      return $http.post(url, serializedPayload, { transformRequest: angular.identity, headers: {'Content-Type': undefined} });
    }

    function checkPayload(payload) {
      requiredFields.forEach(function(field) {
        if (payload[field] === undefined) {
          console.error("Param " + field + " is undefined");
        }
      })
    }

    function serializePayload(payload) {
      var fd = new FormData();
      requiredFields.forEach(function(field) {
          fd.append(field, payload[field]);
      });
      return fd;
    }

    function setPayloadValue(field, value) {
      if (value === undefined) { return; }
      console.log('[bankAccountService] Setting ' + field + ' to ' + value);
      $sessionStorage.payload[field] = value;
    }

    this.getPayload = function(){
      return $sessionStorage.payload;
    }

    this.getPayloadValue = function(field) {
      return $sessionStorage.payload[field];
    }

    //---------------------------------------------------
    // mock methods (will be removed when DEV is done)
    //---------------------------------------------------

    function fillPayloadWithMockValues(payload) {
      setPayloadValue('assetsDeclarationFile', payload.selfieFile);
      setPayloadValue('identityType', 'selectedIdentityType');
      setPayloadValue('expeditionCity', 'expeditionCity');
      setPayloadValue('identityNumber', 'identityNumber');
      setPayloadValue('gender', 'gender');
    }
});
