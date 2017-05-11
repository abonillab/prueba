'use strict';

describe('Directive: Progress Bar', function () {

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
    var el = angular.element('<progress-bar active = "2"></progress-bar>');
    var compiledElement = compile(el)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('divs with steps should be created', function() {
    it("non-active divs" , function() {
      expect(element.find("div[class = 'step normal']").length).toBeGreaterThan(0);
    });

    it("active divs" , function() {
        expect(element.find("div[class ~= 'selected']").length).toBeGreaterThan(0);
    });
  });
  
  describe('The active div should be the second', function() {
    it("active div" , function() {
    	/* JQuery :eq(index) selector starts at 0 */
        expect(element.find("div[class ~= 'step']:eq(1)").length).toBeGreaterThan(0);
        expect(element.find("div[class ~= 'step']:eq(1)").hasClass('selected')).toBe(true);
    });
  });
  
});