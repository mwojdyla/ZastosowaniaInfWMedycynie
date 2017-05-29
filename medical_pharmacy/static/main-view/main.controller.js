(function () {
    'use strict';

    angular.module('app')
        .controller('mainController', ['$scope', 'dataService', 'commonInformationsService', Controller]);

    function Controller($scope, dataService, commonInformationsService) {
        $scope.initController = initController;
        $scope.isAppReady = isAppReady;
        var isReady = false;

        function isAppReady() {
            return isReady;
        }

        function initController(userId) {
            if (userId)
                dataService.getUserById(userId, success);
            else
                isReady = true;

            function success(dataResponse) {
                commonInformationsService.setUser(dataResponse);
                isReady = true;
            }

        }
    }

})();