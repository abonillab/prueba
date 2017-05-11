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
    var el = angular.element('<money-input next-url="/monthlyOutcome" param="monthlyIncome" label="¿Cu&aacute;nto es el total de tus ingresos mensuales?" min="1" max="9999999"></money-input>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('labels', function() { 
    it("should not be messy" , function() {
      expect(element.find('label[for="asd"]').length).toBe(0);
    });

    it("should have one for monthlyIncome" , function() {
      expect(element.find('label[for="monthlyIncome"]').length).toBe(1);
    });
  });

  describe('inputs', function() {
    it("should have one with id == monthlyIncome" , function() {
      expect(element.find('input#monthlyIncome').length).toBe(1);
    });

    describe('masks', function() {
      it("should not be shown when it has less than 4 digits" , function() {
        fillInput("123");
        expect(element.find('input#monthlyIncome').val()).toBe("123");
      });

      it("should be shown when it has more than 3 digits" , function() {
        fillInput("1234");
        expect(element.find('input#monthlyIncome').val()).toBe("1,234");
      });
    })
  });

  describe('validations', function() {
    it("should not have any error messages at the begining" , function() {
      var el = element.find('p.error-msg');
      expect(el.length).toBe(1);
      expect(el.hasClass('ng-hide')).toBe(true);
    });

    it("should have an error message when submit is clicked and the input is equal 0" , function() {
      fillInput("0");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should not have an error message when submit is clicked and the input is higher 1" , function() {
      fillInput("2");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(true);
    });
  });

  describe('data persistence', function() {
    it("should not be run when input is not valid" , function() {
      fillInput("0");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().monthlyIncome).toBe(undefined);
    });

    it("should be run when input is valid" , function() {
      fillInput("123456");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().monthlyIncome).toBe('123,456');
    });
  });

  // ------------------------------
  //        helper methods
  // ------------------------------

  function fillInput(value) {
    var input = element.find('input#monthlyIncome');
    input.val(value);
    input.trigger('input');
  }
});
