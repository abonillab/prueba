(function() {
	'use strict';

	angular.module('accountOpenningFrontendApp').directive('suggestList', suggestList);
	
	function suggestList() {
		return {
			restrict : 'E',
			scope : {
				suggest :"=value",
				change: "=",
				model:"=",
				validValue:"=?",
				modelSuggest:"=",
				actividades:"=?"
			},
			templateUrl : 'components/suggest_list/suggest.template.html',
			link: function(scope, element, attrs) {
				scope.element = element;
			},
			controller: function($scope, bankAccountService) {

				var ciudades = {
					suggestList : [ {
						label : "Bogotá, Distrito Capital",
						value : "BOGOTA D.C. , BOGOTA"
					}, {
						label : "Medellín, Antioquia",
						value : "MEDELLIN, ANTOQUIA"
					}, {
						label : "Cali, Valle del Cauca",
						value : "SANTIAGO DE CALI, VALLECAUCA"
					}, {
						label : "Cartagena, Bolivar",
						value : "CARTAGENA D.TUR. Y CULT. , BOLIVAR"
					} ],
					action: function(i){
						//console.log($scope);
						$scope.model = i.value;
						$scope.validValue = true;
						$scope.modelSuggest = $scope.model;
					},
				};

				var actividades =  {
					suggestList : [ {
						label : "Ganadero",
						value : "ACTIVIDADES DE APOYO A LA GANADERIA"
					}, {
						label : "Fabricador de calzado",
						value : "COMERCIO AL POR MAYOR DE CALZADO"
					}, {
						label : "Comerciante",
						value : "COMERCIO AL POR MENOR DE ALIMENTOS, BEBIDAS Y TABACO, EN PUESTOS DE VENTA MOVILES"
					}, {
						label : "Agricultor",
						value : "ACTIVIDADES DE APOYO A LA AGRICULTURA"
					} ],
					action: function(i){
						//console.log($scope);
						$scope.model = i.value;
						$scope.validValue = true;
						$scope.modelSuggest = $scope.model;
					},
				};
          
				if($scope.actividades){
					$scope.suggest = actividades;
				}else{
					$scope.suggest = ciudades;
				}
				console.log($scope);

			}
		};
	}
})();
