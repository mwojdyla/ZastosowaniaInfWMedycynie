(function () {
    'use strict';

    angular.module('app')
        .service('headerTabsService', ['urlConstants', 'buildUrl', headerTabsService]);

    function headerTabsService(urlConstants, buildUrl) {
        const RIGHT_TABS = {
            EXAMPLE: {
                name: 'example',
                title: 'Example',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.EXAMPLE)
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
                        title: 'Edytuj profil'
                    },
                    {
                        id: 2,
                        title: 'Zmień hasło'
                    },
                    {
                        id: 3,
                        title: 'Wyloguj'
                    }
                ]
            }
        };

        const LEFT_TABS = {
            EXAMPLE_SECOND: {
                name: 'EXAMPLE_SECOND',
                title: 'Example Second',
                dropdown: false,
                route: buildUrl.createURLWithSlash(urlConstants.EXAMPLE_SECOND)
            }
        };

        return {
            rightTabs: RIGHT_TABS,
            leftTabs: LEFT_TABS
        };
    }
})();