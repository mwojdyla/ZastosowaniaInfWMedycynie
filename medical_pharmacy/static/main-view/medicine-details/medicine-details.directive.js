(function () {
    'use strict';
    function Controller($scope) {
      $scope.name = "Super lek";
      $scope.price = "100";
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
