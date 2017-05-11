angular.module('accountOpenningFrontendApp')
 .directive('angucomplete', function ($parse, $http, $sce, $timeout) {
     return {
         restrict: 'EA',
         scope: {
           "nextUrl": "@nextUrl",
           "param": "@param",
           "label": "@label",
           "errorMessage": "@errorMessage",
           "url": "@url",
           "showSuggest":"=?",
           "actividades":"=?"
         },
         templateUrl: 'components/autocomplete/template.html',
         link: function(scope, element, attrs) {
            scope.element = element;
         },

         controller: function($scope, $http, $location, bankAccountService) {

            // TODO: encapsulate this
            $scope.isValidValue = false;
            $http.get($scope.url).then(function(response) {

                var onSelect = function(result, response) {
                  $scope.value = result.description;
                  $scope.valueAutocomplete=result.description;
                  $scope.isValidValue=true;
                  $scope.$apply();
                }

                var onResultsClose = function() {
                  if($scope.value === $scope.valueAutocomplete) return;
                  $scope.isValidValue = false;
                  $scope.$apply();
                }

                $($scope.element).search({
                  source: response.data,
                  duration: 300,
                  searchFullText:true,
                  maxResults: 20,
                  minCharacters: 3,
                  searchFullText: false,
                  fields: { title: 'description', description: '' },
                  searchFields: [ 'description' ],
                  onSelect: onSelect,
                  onResultsClose: onResultsClose
                });
            });

            $scope.nextStep = function() {
              $scope.formSubmitted = true;
              $scope.validate();
              if (!$scope.isValid) return false;
              bankAccountService.save($scope.param, $scope.value);
              console.log($scope.nextUrl)
              $location.url($scope.nextUrl);
            }

            $scope.validate = function() {
              $scope.isValid = !!$scope.value;
            }

            $scope.validateSuggest = function() {
              if($scope.value != $scope.valueAutocomplete){
                $scope.isValidValue = false;
              }
            }

            $scope.isValid = true;
         }
     };
 });
