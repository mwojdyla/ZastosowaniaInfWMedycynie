(function () {
    'use strict';
    function Controller($scope, $location, dataService, commonInformationsService, urlConstants) {
      $scope.addToCart = addToCart;
      $scope.showMedicineDetail = showMedicineDetail;
      $scope.getMedicines = getMedicines;
      $scope.filter = {
        medicineName: "",
        producentName: "",
        withPrescription: false,
        withoutPrescription: false,
        selectedSubstances: [],
        selectedForms: [],
        selectedApplications: [],
        price: 300
      }
      dataService.getMedicineApplications(function(response) {
         $scope.applications =  response;
      });

      dataService.getMedicineForms(function(response) {
         $scope.forms =  response;
      });

      dataService.getSubstancesForms(function(response) {
         $scope.substances =  response;
      });

      getMedicines();
      function addToCart(medicine) {
        commonInformationsService.addToCart(medicine, 1);
      }

      function showMedicineDetail(id) {
        $location.path(urlConstants.MEDICINE_DETAILS + '/' + id)
      }

      function getMedicines() {
        var payload = {
          name: $scope.filter.medicineName,
          producer: $scope.filter.producentName,
          forms: $scope.filter.selectedForms,
          price: $scope.filter.price,
          components: $scope.filter.selectedSubstances,
          applications: $scope.filter.selectedApplications,
          withPrescription: $scope.filter.withPrescription,
          withoutPrescription: $scope.filter.withoutPrescription
        };

        dataService.getMedicines(payload, function(data) {
          $scope.medicines = data;
        });
      }
    }

    angular.module('app')
        .directive('shop', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/shop/shop.html',
                controller: ['$scope', '$location', 'dataService', 'commonInformationsService', 'urlConstants', Controller]
            };
        });
})();
