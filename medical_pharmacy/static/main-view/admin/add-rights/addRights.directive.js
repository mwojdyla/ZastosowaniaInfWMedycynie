(function () {
    'use strict';

    angular.module('app')
        .directive('addRights', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/admin/add-rights/addRights.html',
                controller: ['$scope', '$filter', 'dataService', Controller]
            };

            function Controller($scope, $filter, dataService) {

              function initUsersData(data) {
                $scope.users = data;
              }

              $scope.updatedUsers = [];
              $scope.updatePermissions = function() {
                var payload = $scope.updatedUsers;
                dataService.updateUsersPermissions(payload);
              }

              $scope.filterUser = function(user) {
                if (!$scope.wantedUser || (user.firstName.toLowerCase().indexOf($scope.wantedUser) != -1)
                      || (user.lastName.toLowerCase().indexOf($scope.wantedUser.toLowerCase()) != -1)
                      || (user.email.toLowerCase().indexOf($scope.wantedUser.toLowerCase()) != -1) ) {
                  return true;
                }
                return false;
              };

              $scope.changeUserPermissions = function(userId) {
                var alreadyUpdatedUser = $filter('filter')($scope.updatedUsers, userId);
                if(alreadyUpdatedUser.length !== 0) {
                  $scope.updatedUsers = $filter('filter')($scope.updatedUsers, function(id) {
                    return (id != userId);
                  });
                } else {
                  $scope.updatedUsers.push(userId);
                }
              }

              dataService.getAllUsers(initUsersData);
            }
        });

})();
