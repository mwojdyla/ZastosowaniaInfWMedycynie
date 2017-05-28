(function () {
    'use strict';

    angular.module('app')
        .service('headerTabsService', ['urlConstants', 'buildUrl', headerTabsService]);

    function headerTabsService(urlConstants, buildUrl) {
        const RIGHT_TABS = {
            CART: {
                name: 'cart',
                disable: false,
                title: 'Koszyk',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOPING_CART)
            },
            AUTHENTICATE: {
                name: 'authenticate',
                disable: false,
                title: 'Zarejestruj / Zaloguj',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.AUTHENTICATE)
            },
            PROFIL: {
                name: 'Profil',
                disable: false,
                title: 'Profil',
                dropdown: true,
                items: [
                    {
                        id: 0,
                        title: 'email'
                    },
                    {
                        id: 1,
                        title: 'Edytuj Profil'
                    },
                    {
                        id: 2,
                        title: 'Zmień Hasło'
                    },
                    {
                        id: 3,
                        title: 'Wyloguj'
                    }
                ]
            }
        };

        const LEFT_TABS = {
            SHOP: {
                name: 'shop',
                disable: false,
                title: 'Sklep',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOP)
            },
            DETAILS: {
                name: 'medicine-details',
                disable: false,
                title: 'Szczegóły leku',
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