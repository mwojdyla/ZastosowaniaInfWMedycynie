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
                controller: ['$scope', 'commonInformationsService', 'dataService', '$location', 'urlConstants', Controller]
            };

            function Controller($scope, commonInformationsService, dataService, $location, urlConstants) {
                $scope.products = commonInformationsService.getCart();
                $scope.order = commonInformationsService.getOrderDetails();
                $scope.user = commonInformationsService.getUser();
                $scope.submit = submit;
                calculateWholeCost();

                function submit() {
                    var objectToSend = {
                        email: $scope.user.email,
                        firstName: $scope.user.firstName,
                        lastName: $scope.user.lastName,
                        price: $scope.wholeValueCart,
                        isTransfer: $scope.order.payType === 'transfer'
                    };
                    dataService.sendEmailOrder(objectToSend, success);

                    function success() {
                        commonInformationsService.removeWholeOrder();
                        commonInformationsService.removeWholeCart();
                        $location.path(urlConstants.SHOP);
                    }
                }

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
