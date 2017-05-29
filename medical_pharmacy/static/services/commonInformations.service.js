(function () {
    'use strict';

    angular.module('app')
        .service('commonInformationsService', [commonInformationsService]);

    function commonInformationsService() {
        var user, company;

        return {
            setUser: setUser,
            getUser: getUser
        };

        function setUser(newUser) {
            user = newUser;
        }

        function getUser() {
            return angular.copy(user);
        }
    }

})();
