(function () {
    angular.module('accountOpenningFrontendApp')
    .directive('dateInput', dateInput);
    function dateInput() {

      var INVALID_FORMAT_ERROR = "El formato correcto es dia / mes / año. Ex.: 01/02/1975";
      var TOO_LOW_YEAR_ERROR = "Revisa la fecha por favor";

      return {

          restrict:'E',
          templateUrl:'components/date-input/template.html',

          scope: {
            nextUrl: "@nextUrl",
            param: "@param",
            label: "@label",
            maxYearsErrorMessage: "@",
            maxYearsBehind: "@",
            minYearsAhead: "@",
            baseDateParamName: "@"
          },

          controller: function($scope, $location, bankAccountService) {

            $scope.nextStep = function() {
              $scope.formSubmitted = true;
              if (!$scope.isValid()) return false;
              bankAccountService.save($scope.param, $scope.value);
              $location.url($scope.nextUrl);
            }

            $scope.isValid = function() {
              var isInvalid = $scope.getValidationNames().some(function(validationName) { return !$scope[validationName]() });
              return !isInvalid;
            }

            $scope.getValidationNames = function() {
              return Object.keys($scope).filter(function(attr) { return attr.match("^validate.+"); })
            }

            // validations methods should be created with pattern validateXXX
            // otherwise they will not be run

            $scope.validateDateFormat = function() {
              var date = $scope.value;
              var dateFormatIsValid = date && date.split('/').join('').match("^\\d+$") && $scope.getDate().isValid();
              $scope.error = dateFormatIsValid ? null : INVALID_FORMAT_ERROR;
              return !$scope.error;
            }

            $scope.validateDateTooLow = function() {
              if ($scope.getDate() < $scope.getMoreThanHundredYearsAgoDate()) {
                $scope.error = TOO_LOW_YEAR_ERROR;
              }
              return !$scope.error;
            }

            $scope.validateYearsBehind = function() {
              if (!$scope.maxYearsBehind) return true;
              $scope.error = ($scope.getDate() > $scope.getMaxYearsBehindDate()) ? $scope.maxYearsErrorMessage : null;
              return !$scope.error;
            }

            $scope.validateYearsAhead = function() {
              if (!$scope.minYearsAhead) return true;
              $scope.error = ($scope.getDate() < $scope.getMinYearsAheadDate()) ? TOO_LOW_YEAR_ERROR : null;
              return !$scope.error;
            }

            $scope.getDate = function() {
              return $scope.fromStringToDate($scope.value);
            }

            $scope.getMaxYearsBehindDate = function() {
              var maxYearsBehind = $scope.maxYearsBehind;
              return moment().add(-maxYearsBehind, 'years');
            }

            $scope.getMinYearsAheadDate = function() {
              var baseDateParamName = $scope.baseDateParamName;
              var baseDate = $scope.fromStringToDate(bankAccountService.getPayload()[baseDateParamName]);
              return baseDate.add($scope.minYearsAhead, 'years');
            }

            // low level helper methods
            $scope.getMoreThanHundredYearsAgoDate = function() {
              return moment().add(-110, 'years');
            }

            $scope.fromStringToDate = function (str) {
              return moment(str, "DD/MM/YYYY");
            }
          }
      };
    }
 })();
