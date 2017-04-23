(function () {
    'use strict';

    angular
        .module('appAuthorization', [
            'ngAnimate',
            'mgcrea.ngStrap',
            'ngMaterial',
            'ngRoute',
            'ngSanitize'
        ])
        .config(function ($dropdownProvider,
                          $interpolateProvider,
                          $mdThemingProvider,
                          $mdDateLocaleProvider,
                          $modalProvider,
                          $httpProvider) {
            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');

            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

            $mdDateLocaleProvider.months = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj',
                'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad',
                'grudzień'
            ]
            ;
            $mdDateLocaleProvider.shortMonths = ['stycz', 'luty', 'mar', 'kwiec', 'maj', 'czerw',
                'lip', 'sierp', 'wrze', 'paź', 'list', 'grudz'
            ]
            ;
            $mdDateLocaleProvider.days = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek',
                'sobota', 'niedziela'
            ]
            ;
            $mdDateLocaleProvider.shortDays = ['pon', 'wto', 'śro', 'czw', 'piąt',
                'sob', 'niedz'
            ]
            ;

            $mdDateLocaleProvider.firstDayOfWeek = 0;
        })
})();