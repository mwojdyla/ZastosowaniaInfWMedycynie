(function () {
    'use strict';

    angular.module('app')
        .directive('addMedicine', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/admin/add-medicine/addMedicine.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
