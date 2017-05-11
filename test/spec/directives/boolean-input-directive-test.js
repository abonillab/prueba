'use strict';

describe('Directive: Boolean Input', function () {

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
    var el = angular.element('<boolean-input next-url="/usa-long-time-visitor" param="usaLongTimeVisitor" label="¿Has permanecido más de 183 días durante los últimos 3 años en los Estados Unidos?" ps-note="Esta pregunta no tiene ningún impacto en la apertura de tu cuenta." />');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('options', function() {
    it("should have yes option" , function() {
      expect(element.find('#usaLongTimeVisitorYes').length).toBe(1);
    });

    it("should have no option" , function() {
      expect(element.find('#usaLongTimeVisitorNo').length).toBe(1);
    });
  });

  describe('data persistence', function() {
    it("should save yes when Si button is clicked" , function() {
      element.find('#usaLongTimeVisitorYes').click();
      expect(bankAccountService.getPayload().usaLongTimeVisitor).toBe(true);
    });

    it("should save yes when No button is clicked" , function() {
      element.find('#usaLongTimeVisitorNo').click();
      expect(bankAccountService.getPayload().usaLongTimeVisitor).toBe(false);
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
