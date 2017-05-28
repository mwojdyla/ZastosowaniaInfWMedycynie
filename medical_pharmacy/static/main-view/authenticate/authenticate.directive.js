(function () {
    'use strict';

    angular.module('app')
        .directive('authenticate', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/authenticate/authenticate.html',
                controller: [
                    '$scope',
                    '$location',
                    'urlConstants',
                    'eventsService',
                    'typeEvents',
                    'dataService',
                    'utilsService',
                    'commonInformationsService',
                    Controller]
            };

            function Controller($scope,
                                $location,
                                urlConstants,
                                eventsService,
                                typeEvents,
                                dataService,
                                utilsService,
                                commonInformationsService) {
                $scope.user = {};
                $scope.newUser = {};
                $scope.login = login;
                $scope.register = register;

                function login() {
                    dataService.login($scope.user, success);

                    function success(response) {
                        commonInformationsService.setUser(response);
                        eventsService.notify(typeEvents.DISABLE_AUTHENTICATION);
                        $location.path(urlConstants.SHOP);
                    }
                }

                function register() {
                    var dataToSend = angular.copy($scope.newUser);
                    dataToSend.birthDate = utilsService.parseDateToString($scope.newUser.birthDate);
                    dataService.register(dataToSend, success);

                    function success(response) {
                        commonInformationsService.setUser(response);
                        eventsService.notify(typeEvents.DISABLE_AUTHENTICATION);
                        $location.path(urlConstants.SHOP);
                    }
                }
            }
        });

})();
