(function () {
    'use strict';

    angular.module('app')
        .constant("urlConstants", {
            SHOP: 'shop',
            SHOPING_CART: 'shoping-cart',
            AUTHENTICATE: 'authenticate',
            MEDICINE_DETAILS: 'medicine-details'
        })
        .config(function ($routeProvider, urlConstants, buildUrlProvider) {
            $routeProvider
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.SHOP), {
                    templateUrl: "static/executionDirectiveFromURL/shop.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.SHOPING_CART), {
                    templateUrl: "static/executionDirectiveFromURL/shoping-cart.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.AUTHENTICATE), {
                    templateUrl: "static/executionDirectiveFromURL/authenticate.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.MEDICINE_DETAILS), {
                    templateUrl: "static/executionDirectiveFromURL/medicine-details.html"
                });
        });

})();