(function () {
    'use strict';

    angular.module('app')
        .constant("urlConstants", {
            ADMIN_PREFIX: 'admin',
            ADD_RIGHTS: 'add-rights',
            ADD_MEDICINE: 'add-medicine',
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
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.MEDICINE_DETAILS, ':id'), {
                    templateUrl: "static/executionDirectiveFromURL/medicine-details.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.ADMIN_PREFIX, urlConstants.ADD_RIGHTS), {
                    templateUrl: "static/executionDirectiveFromURL/add-rights.html"
                })
                .when(buildUrlProvider.$get().createURLWithSlash(urlConstants.ADMIN_PREFIX, urlConstants.ADD_MEDICINE), {
                    templateUrl: "static/executionDirectiveFromURL/add-medicine.html"
                });
        });

})();
