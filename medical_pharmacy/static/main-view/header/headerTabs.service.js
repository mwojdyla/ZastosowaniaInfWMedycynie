(function () {
    'use strict';

    angular.module('app')
        .service('headerTabsService', ['urlConstants', 'buildUrl', headerTabsService]);

    function headerTabsService(urlConstants, buildUrl) {
        const RIGHT_TABS = {
            CART: {
                name: 'cart',
                title: 'Koszyk',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOPING_CART)
            },
            AUTHENTICATE: {
                name: 'authenticate',
                title: 'Zarejestruj / Zaloguj',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.AUTHENTICATE)
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
                title: 'Sklep',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.SHOP)
            },
            DETAILS: {
                name: 'medicine-details',
                title: 'Szczegóły leku',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.MEDICINE_DETAILS)
            },
            ADMIN: {
                name: 'admin',
                title: 'Panel administratora',
                dropdown: true,
                items: [
                    {
                        id: 0,
                        title: 'Dodaj lek',
                        route: buildUrl.createURLWithSlash(urlConstants.ADMIN_PREFIX, urlConstants.ADD_MEDICINE)
                    },
                    {
                        id: 1,
                        title: 'Dodaj prawa użytkownikowi',
                        route: buildUrl.createURLWithSlash(urlConstants.ADMIN_PREFIX, urlConstants.ADD_RIGHTS)
                    }
                ]
            }
        };

        return {
            rightTabs: RIGHT_TABS,
            leftTabs: LEFT_TABS
        };
    }
})();