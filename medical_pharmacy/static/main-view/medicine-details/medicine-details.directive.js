(function () {
    'use strict';
    function Controller($scope) {
      $scope.medicine = {
        name: "Super lek",
        imagePath: "http://naukawpolsce.pap.pl/Data/Thumbs/_plugins/information/396527/MTAyNHg3Njg,14305581_14305647.jpg",
        price: "100",
        applications: ["Alergia", "Ból dupy"],
        producent: "Ziomeczek",
        form: "Spray",
        amount: "500"
      };

    }

    angular.module('app')
        .directive('medicineDetails', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/medicine-details/medicine-details.html',
                controller: ['$scope', Controller]
            };
        });

})();
