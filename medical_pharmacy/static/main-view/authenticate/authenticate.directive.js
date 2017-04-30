(function () {
    'use strict';

    angular.module('app')
        .directive('authenticate', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/authenticate/authenticate.html',
                controller: ['$scope', Controller]
            };

            function Controller($scope) {

            }
        });

})();
