'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('accountOpenningFrontendApp'));

  var MainController,
    scope, bankAccountService, httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _bankAccountService_, $httpBackend){
    scope = $rootScope.$new();

    bankAccountService = _bankAccountService_;
    httpBackend = $httpBackend;

    MainController = $controller('MainController', {
      $scope: scope,
      bankAccountService: _bankAccountService_
    });
  }));

  it( "Testing save input data." , function() {
	  var anotherScope = {};

	  anotherScope['first_name'] = 'Test';
	  anotherScope['middle_name'] = 'Name';
	  anotherScope['totalDebts'] = null;
	  anotherScope['monthlyOutcome'] = undefined;

	  bankAccountService.saveInputData(anotherScope);

	  console.log(bankAccountService.payload);

	  expect(bankAccountService.getPayload()['first_name'] !== undefined);
	  expect(bankAccountService.getPayload()['middle_name'] !== undefined);
  });

  it( "Test Finish" , function(){
	  httpBackend.whenPOST("http://localhost:8080/bankAccounts").respond({

	        	error: false,
	        	message: "account saved!"

	    });

	  	bankAccountService.finish('http://localhost:8080').then(function(response) {
	  		expect(response.data).toEqual({
	        	error: false,
	        	message: "account saved!"
	        });
	    });
	    httpBackend.flush();
  });

});
