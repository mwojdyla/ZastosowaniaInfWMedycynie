(function () {
    'use strict';

    angular.module('app')
        .directive('authenticate', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/authenticate/authenticate.html',
                controller: ['$scope', 'dataService', 'utilsService', Controller]
            };

            function Controller($scope, dataService, utilsService) {
                $scope.user={};
                $scope.newUser = {};
                $scope.login = login;
                $scope.register = register;

                function login() {
                    dataService.login($scope.user, function(){
                        alert('CORRECT');
                    })
                }

                function register() {
                    var dataToSend = angular.copy($scope.newUser);
                    dataToSend.birthDate = utilsService.parseDateToString($scope.newUser.birthDate);
                    dataService.register(dataToSend, function(){
                        alert('CORRECT');
                    })
                }
            }
        });

})();
