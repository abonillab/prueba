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
    var el = angular.element('<date-input next-url="/expeditionCity" param="expeditionDate" label="¿Cuándo se expidió tu documento de identificación?" min-years-ahead="18" base-date-param-name="birthDate"></date-input>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('using base-year', function() {

    it("should be valid when max-years is respected using base-date as reference", function() {
      fillInput("12092005");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(true);
    });

    it("should be valid when max-years is respected using base-date as reference", function() {
      fillInput("12091900");
      element.find('input[type=submit]').click();
      expect(element.find('p.error-msg').hasClass('ng-hide')).toBe(false);
    });
  })

  // ------------------------------
  //        helper methods
  // ------------------------------

  function fillInput(value) {
    var input = element.find('input#expeditionDate');
    input.val(value);
    input.trigger('input');
  }
});
