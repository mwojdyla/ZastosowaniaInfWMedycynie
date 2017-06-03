(function () {
    'use strict';

    angular.module('app')
        .directive('assume', function () {
            return {
                restrict: 'E',
                scope: {
                    backToDelivery: '=',
                    backToProducts: '='
                },
                templateUrl: 'static/main-view/cart/assume/assume.html',
                controller: ['$scope', 'commonInformationsService', Controller]
            };

            function Controller($scope, commonInformationsService) {
                $scope.products = commonInformationsService.getCart();
                $scope.order = commonInformationsService.getOrderDetails();
                $scope.user = commonInformationsService.getUser();
                calculateWholeCost();

                function calculateWholeCost() {
                    $scope.wholeValueCart = 0;
                    $scope.products.forEach(function(value) {
                       $scope.wholeValueCart += Number(value.quantity) * Number(value.medicine.price);
                    });
                    $scope.wholeValueCart += Number($scope.order.priceTransport);
                }
            }
        });

})();
