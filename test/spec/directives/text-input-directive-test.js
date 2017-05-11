'use strict';

describe('Directive: Text Input', function () {

  beforeEach(module('accountOpenningFrontendApp'));

  beforeEach(module('dir-templates'));

  var compile, scope, element, bankAccountService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($compile, $rootScope, _bankAccountService_) {
    compile = $compile;
    scope = $rootScope.$new();
    element = getCompiledElement();
    bankAccountService = _bankAccountService_;
  }));
  
  
  beforeEach(function(){
	 fillInput(''); 
  });

  function getCompiledElement(){
    var el = angular.element('<text-input next-url="/testUrl" param="testField" button-id="btnNextTest" input-id="txtTestField" label="Enter your test field" error-message="Wrong test field" min="6" max="10"></text-input>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('labels', function() {
    it("should not be messy" , function() {
      expect(element.find('label[for="asd"]').length).toBe(0);
    });

    it("should have one for txtTestField" , function() {
      expect(element.find('label[for="txtTestField"]').length).toBe(1);
    });
  });

  describe('inputs', function() {
    it("should have one with id == txtTestField" , function() {
      expect(element.find('input#txtTestField').length).toBe(1);
    });
    
    it("should capitalize content" , function() {
	    fillInput("abcabc");
	    expect(element.find('input#txtTestField').val()).toBe("Abcabc");
	 });
  });

  describe('validations', function() {
	it("should not allow digits" , function() {
        fillInput("123");
        expect(element.find('input#txtTestField').val()).toBe("");
    });
	
    it("should not have any error messages at the begining" , function() {
      var el = element.find('p.bottom-error-msg');
      expect(el.length).toBe(1);
      expect(el.hasClass('ng-hide')).toBe(true);
    });

    it("should have an error message when submit is clicked and the input is empty" , function() {
      element.find('input[type=submit]').removeAttr("disabled");
      element.find('input[type=submit]').click();
      expect(element.find('p.bottom-error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should have an error message when submit is clicked and the input is less than 6 digits" , function() {
      fillInput("abcab");
      element.find('input[type=submit]').click();
      expect(element.find('p.bottom-error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should not have an error message when submit is clicked and the input is more than 5 digits" , function() {
      fillInput("abcabc");
      element.find('input[type=submit]').click();
      expect(element.find('p.bottom-error-msg').hasClass('ng-hide')).toBe(true);
    });
  });

  describe('data persistence', function() {
    it("should not be run when input is not valid" , function() {
      fillInput("abcab");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().testField).toBe(undefined);
    });

    it("should be run when input is valid" , function() {
      fillInput("abcabc");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().testField).toBe('Abcabc');
    });
  });

  // ------------------------------
  //        helper methods
  // ------------------------------

  function fillInput(value) {
    var input = element.find('input#txtTestField');
    input.val(value);
    input.trigger('input');
  }
});
