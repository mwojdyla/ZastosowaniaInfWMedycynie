(function () {
    'use strict';
    function Controller($scope, $routeParams, $location, dataService, commonInformationsService, urlConstants) {
      var medicineId = $routeParams.id;
      dataService.getMedicineDetail(medicineId, initMedicineData);

      $scope.amount = 1;
      $scope.addToCart = addToCart;
      $scope.showSubstitute = showSubstitute;

      function addToCart(medicine) {
        commonInformationsService.addToCart(medicine, $scope.amount);
      }

      function initMedicineData(data) {
        $scope.medicine = {
          id: 2,
          name: "Super lek",
          imagePath: "http://naukawpolsce.pap.pl/Data/Thumbs/_plugins/information/396527/MTAyNHg3Njg,14305581_14305647.jpg",
          price: 100,
          application: [
            {
              id: 1,
              application: "Alergia"
            },
            {
              id: 2,
              application: "Ból dupy"
            }
          ],
          producer: "Ziomeczek",
          form: {
            id: 1,
            form: "Spray"
          },
          quantityInPackage: { amount: "500", kind: "ml"},
          composition: [
            {
              id: 1,
              name: "koka"
            },
            {
              id: 2,
              name: "hera"
            },
            {
              id: 1,
              name: "Hasz"
            }
          ],
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
                controller: ['$scope', '$routeParams', '$location', 'dataService', 'commonInformationsService', 'urlConstants', Controller]
            };
        });

})();
