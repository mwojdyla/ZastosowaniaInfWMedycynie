(function () {
    'use strict';

    angular.module('app')
        .service('cartTabsService', cartTabsService);

    function cartTabsService() {
        const tabs = {
            PRODUCTS: {
                id: 0,
                title: 'Rzeczy w koszyku',
                active: true
            },
            DELIVERY: {
                id: 1,
                title: 'Dostawa',
                active: false

            },
            ASSUME: {
                id: 2,
                title: 'Podsumowanie',
                active: false

            }
        };
        var selectedTab = tabs.PRODUCTS;

        return {
            tabs: tabs,
            getSelectedTab: getSelectedTab,
            changeTab: changeTab,
            isTabActive: isTabActive,
            isProducts: isProducts,
            isDelivery: isDelivery,
            isAssume: isAssume
        };

        function isTabActive(tab) {
            return tab.active;
        }

        function getSelectedTab() {
            return selectedTab;
        }

        function changeTab(tab) {
            selectedTab.active = false;
            tab.active = true;
            selectedTab = tab;
        }

        function isProducts() {
            return tabs.PRODUCTS.active;
        }

        function isDelivery() {
            return tabs.DELIVERY.active;
        }

        function isAssume() {
            return tabs.ASSUME.active;
        }
    }
})();