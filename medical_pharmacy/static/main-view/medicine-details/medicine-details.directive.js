(function () {
    'use strict';
    function Controller($scope, $routeParams, $location, dataService, commonInformationsService, urlConstants) {
      var medicineId = $routeParams.id;
      dataService.getMedicineDetail(medicineId, initMedicineData);

      $scope.amount = 1;
      $scope.addToCart = addToCart;
      $scope.showSubstitute = showSubstitute;
      $scope.isInCart = isInCart;

      function isInCart(medicineId) {
          var cart = commonInformationsService.getCart();

          return cart.some(function(value) {
              return medicineId === value.medicine.id;
          });
      }

      function addToCart(medicine) {
        commonInformationsService.addToCart(medicine, $scope.amount);
      }

      function initMedicineData(data) {
        $scope.medicine = data;
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
