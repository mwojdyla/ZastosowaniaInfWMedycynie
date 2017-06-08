(function () {
    'use strict';

    angular.module('app')
        .directive('products', function () {
            return {
                restrict: 'E',
                scope: {
                    onSubmit: '='
                },
                templateUrl: 'static/main-view/cart/products/products.html',
                controller: ['$scope', 'commonInformationsService', Controller]
            };

            function Controller($scope, commonInformationsService) {
                var cartValid = false;
                $scope.products = commonInformationsService.getCart();
                $scope.removeFromCart = removeFromCart;
                $scope.calculateCart = calculateCart;
                $scope.isSubmitEnable = isSubmitEnable;
                $scope.wholeValueCart = 0;
                calculateCart();
                function removeFromCart(id) {
                    commonInformationsService.removeFromCart(id);
                    $scope.products = commonInformationsService.getCart();
                    calculateCart();
                }

                function calculateCart(indexInCart, quantity) {
                    if(indexInCart) {
                        commonInformationsService.updateQuantityElementInCart(indexInCart, quantity)
                    }
                    $scope.wholeValueCart = 0;
                    if(!$scope.products.length) {
                        cartValid = false;
                        return;
                    }
                    var isNotCalculate = $scope.products.some(function(value) {
                       return value.quantity < 1;
                    });

                    if(isNotCalculate) {
                        cartValid = false;
                        return;
                    }
                    cartValid = true;
                    $scope.products.forEach(function(value) {
                       $scope.wholeValueCart += Number(value.quantity) * Number(value.medicine.price);
                    });
                }

                function isSubmitEnable() {
                    return $scope.products.length > 0 && cartValid;
                }
            }
        });

})();
