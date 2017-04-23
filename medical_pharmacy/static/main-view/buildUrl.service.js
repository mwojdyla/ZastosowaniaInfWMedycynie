(function () {
    'use strict';

    angular.module('app')
        .provider('buildUrl', buildUrl);

    function buildUrl() {

        this.$get = function () {
            return {
                createURLWithHash: createURLWithHash,
                createURLWithSlash: createURLWithSlash,
                createURLWithSlashOnEnd: createURLWithSlashOnEnd
            };

            function createURLWithHash() {
                const arg = Array.prototype.slice.call(arguments);
                return '#/' + arg.join('/');
            }

            function createURLWithSlash() {
                const arg = Array.prototype.slice.call(arguments);
                return '/' + arg.join('/');
            }

            function createURLWithSlashOnEnd() {
                const arg = Array.prototype.slice.call(arguments);
                return arg.join('/');
            }

        };
    }
})();