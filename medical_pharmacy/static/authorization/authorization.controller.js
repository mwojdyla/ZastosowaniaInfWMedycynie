(function () {
    'use strict';

    angular.module('appAuthorization')
        .controller('authorizationController', ['$scope', Controller]);

    function Controller($scope) {
        $scope.parseDateToString = parseDateToString;

        function parseDateToString(date) {
            if(!date) return;

            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }

            return year + '-' + month + '-' + day;
        }
    }
})();