(function () {
    'use strict';

    angular.module('app')
        .constant("urlConstants", {
            EXAMPLE: 'example',
            EXAMPLE_SECOND: 'example-second'
        })
        .config(function ($routeProvider, urlConstants, buildUrlProvider) {
            $routeProvider
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.EXAMPLE), {
                    templateUrl: "static/executionDirectiveFromURL/example.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.EXAMPLE_SECOND), {
                    templateUrl: "static/executionDirectiveFromURL/example-second.html"
                });
        });

})();