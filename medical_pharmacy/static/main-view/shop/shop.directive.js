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
          $scope.medicines =
          [
            {
              id: 2,
              name: "Super lek 2",
              imagePath: "http://naukawpolsce.pap.pl/Data/Thumbs/_plugins/information/396527/MTAyNHg3Njg,14305581_14305647.jpg",
              price: "100",
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
              producer: "Ziomeczek nr 2",
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
              use: "Prosze wlozyc to sobie gleboko w tyleczek"
            },
            {
              id:3,
              name: "Super lek 3",
              imagePath: "static/images/example.jpg",
              price: "100",
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
              use: "Prosze wlozyc to sobie gleboko w tyleczek"
            }
          ];
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
