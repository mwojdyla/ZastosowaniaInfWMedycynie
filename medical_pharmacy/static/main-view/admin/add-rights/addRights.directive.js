(function () {
    'use strict';

    angular.module('app')
        .directive('addRights', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/admin/add-rights/addRights.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
