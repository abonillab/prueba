'use strict';

describe('Directive: Number Input', function () {

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

  function getCompiledElement(){
    var el = angular.element('<number-input next-url="/birthday" param="identityNumber" label="desc label" error-message="err msg" min="6" max="10"></number-input>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('labels', function() {
    it("should not be messy" , function() {
      expect(element.find('label[for="asd"]').length).toBe(0);
    });

    it("should have one for identityNumber" , function() {
      expect(element.find('label[for="identityNumber"]').length).toBe(1);
    });
  });

  describe('inputs', function() {
    it("should have one with id == identityNumber" , function() {
      expect(element.find('input#identityNumber').length).toBe(1);
    });

    describe('masks', function() {
      it("should not be shown when it has less than 4 digits" , function() {
        fillInput("123");
        expect(element.find('input#identityNumber').val()).toBe("123");
      });

      it("should be shown when it has more than 3 digits" , function() {
        fillInput("1234");
        expect(element.find('input#identityNumber').val()).toBe("1.234");
      });
    })
  });

  describe('validations', function() {
    it("should not have any error messages at the begining" , function() {
      var el = element.find('p.error-msg');
      expect(el.length).toBe(1);
      expect(el.hasClass('ng-hide')).toBe(true);
    });

    it("should have an error message when submit is clicked and the input is empty" , function() {
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should have an error message when submit is clicked and the input is less than 6 digits" , function() {
      fillInput("12345");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should not have an error message when submit is clicked and the input is more than 5 digits" , function() {
      fillInput("123456");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(true);
    });
  });

  describe('data persistence', function() {
    it("should not be run when input is not valid" , function() {
      fillInput("12345");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().identityNumber).toBe(undefined);
    });

    it("should be run when input is valid" , function() {
      fillInput("123456");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().identityNumber).toBe('123.456');
    });
  });

  // ------------------------------
  //        helper methods
  // ------------------------------

  function fillInput(value) {
    var input = element.find('input#identityNumber');
    input.val(value);
    input.trigger('input');
  }
});
