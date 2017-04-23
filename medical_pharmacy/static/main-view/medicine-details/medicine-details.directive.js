(function () {
    'use strict';

    angular.module('app')
        .directive('medicineDetails', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/medicine-details/medicine-details.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
