'use strict';

describe('Directive: Date Input', function () {

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
    var el = angular.element('<date-input next-url="/asdkljsa" param="birthday" label="Digita tu fecha de nacimiento" max-years-error-message="Debes tener mas que 18 años." max-years-behind="18"></date-input>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('labels', function() {
    it("should not be messy" , function() {
      expect(element.find('label[for="asd"]').length).toBe(0);
    });

    it("should have one for birthday" , function() {
      expect(element.find('label[for="birthday"]').length).toBe(1);
    });
  });

  describe('inputs', function() {
    it("should have one with id == birthday" , function() {
      expect(element.find('input#birthday').length).toBe(1);
    });

    describe('masks', function() {
      it("should not be shown when it has less than 3 digits" , function() {
        fillInput("12");
        expect(element.find('input#birthday').val()).toBe("12/MM/AAAA");
      });

      it("should be shown when it has more than 2 digits" , function() {
        fillInput("1209");
        expect(element.find('input#birthday').val()).toBe("12/09/AAAA");
      });
    })
  });

  describe('validations', function() {
    it("should not have any error messages when page loads" , function() {
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(true);
    });

    it("should not allow forward to next item when field is empty" , function() {
      expect(element.find('input[type=submit]').prop('disabled')).toBe(true);
    });

    it("should have an error message when submit is clicked and the input is less than 8 digits" , function() {
      fillInput("12");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should have an error message when submit is clicked and the date is less than 18 years ago" , function() {
      fillInput("12092016");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });

    it("should not have an error message when submit is clicked and the input has a valid date" , function() {
      fillInput("12091986");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(true);
    });

    it("should have an error message when submit is clicked and the input has a too old date" , function() {
      fillInput("12091900");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });
  });

  describe('data persistence', function() {
    it("should not be run when input is not valid" , function() {
      fillInput("12345");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().birthday).toBe(undefined);
    });

    it("should be run when input is valid" , function() {
      fillInput("12091986");
      element.find('input[type=submit]').click();
      expect(bankAccountService.getPayload().birthday).toBe('12/09/1986');
    });
  });

  // ------------------------------
  //        helper methods
  // ------------------------------

  function fillInput(value) {
    var input = element.find('input#birthday');
    input.val(value);
    input.trigger('input');
  }
});
