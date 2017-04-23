(function () {
    'use strict';

    angular.module('app')
        .service('headerTabsService', ['urlConstants', 'buildUrl', headerTabsService]);

    function headerTabsService(urlConstants, buildUrl) {
        const RIGHT_TABS = {
            CART: {
                name: 'cart',
                title: 'Shoping Cart',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOPING_CART)
            },
            PROFIL: {
                name: 'Profil',
                title: 'Profil',
                dropdown: true,
                items: [
                    {
                        id: 0,
                        title: 'email'
                    },
                    {
                        id: 1,
                        title: 'Edit profil'
                    },
                    {
                        id: 2,
                        title: 'Change Password'
                    },
                    {
                        id: 3,
                        title: 'Logout'
                    }
                ]
            }
        };

        const LEFT_TABS = {
            SHOP: {
                name: 'shop',
                title: 'Shop',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOP)
            },
            DETAILS: {
                name: 'medicine-details',
                title: 'Medicine Details',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.MEDICINE_DETAILS)
            }
        };

        return {
            rightTabs: RIGHT_TABS,
            leftTabs: LEFT_TABS
        };
    }
})();