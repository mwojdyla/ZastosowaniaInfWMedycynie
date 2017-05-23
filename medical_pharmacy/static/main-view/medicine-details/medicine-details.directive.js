(function () {
    'use strict';
    function Controller($scope, $routeParams, $location, dataService, urlConstants) {
      var medicineId = $routeParams.id;
      dataService.getMedicineDetail(medicineId, initMedicineData);


      $scope.showSubstitute = showSubstitute;

      function initMedicineData(data) {
        $scope.medicine = {
          name: "Super lek",
          imagePath: "http://naukawpolsce.pap.pl/Data/Thumbs/_plugins/information/396527/MTAyNHg3Njg,14305581_14305647.jpg",
          price: "100",
          applications: ["Alergia", "Ból dupy"],
          producent: "Ziomeczek",
          form: "Spray",
          quantityInPackage: { amount: "500", kind: "ml"},
          composition: ["koka", "hera", "Hasz"],
          substitutes: [{name: "Hera", id: 1}, {name: "Koka", id: 2}],
          use: "Prosze wlozyc to sobie gleboko w tyleczek"
        };

      }

      function showSubstitute(substituteId) {
        $location.path(urlConstants.MEDICINE_DETAILS + '/' + substituteId)
      }

    }

    angular.module('app')
        .directive('medicineDetails', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/medicine-details/medicine-details.html',
                controller: ['$scope', '$routeParams', '$location', 'dataService', 'urlConstants', Controller]
            };
        });

})();
