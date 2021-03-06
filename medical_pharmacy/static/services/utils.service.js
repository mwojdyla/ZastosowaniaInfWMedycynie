(function () {
    'use strict';

    angular.module('app')
        .service('utilsService', [utilsService]);
    function utilsService() {

        return {
            parseDateToString: parseDateToString
        };

        function parseDateToString(date) {
            if (!(date instanceof Date)) return date;

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
