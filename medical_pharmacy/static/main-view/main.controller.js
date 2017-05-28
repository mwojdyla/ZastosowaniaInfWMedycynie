(function () {
    'use strict';

    angular.module('app')
        .controller('mainController', ['$scope', 'dataService', 'eventsService', 'typeEvents', Controller]);

    function Controller($scope, dataService, eventsService, typeEvents) {
        $scope.initController = initController;

        function initController(userId) {
            if (userId)
                success();
                //dataService.getUserById(userId, success);

            function success(dataResponse){
                eventsService.notify(typeEvents.DISABLE_AUTHENTICATION, {});
                // UZUPELNIENIE INFO o USERZE
            }
        }
    }

})();