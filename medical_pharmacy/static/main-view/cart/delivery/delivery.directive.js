(function () {
    'use strict';

    angular.module('app')
        .directive('delivery', function () {
            return {
                restrict: 'E',
                scope: {
                    onBack: '=',
                    onSubmit: '='
                },
                templateUrl: 'static/main-view/cart/delivery/delivery.html',
                controller: ['$scope', '$location', 'urlConstants', 'commonInformationsService', Controller]
            };

            function Controller($scope, $location, urlConstants, commonInformationsService) {
                const cart = commonInformationsService.getCart();
                $scope.isDeliveryToHomePossible = isToHomePossible();
                $scope.user = commonInformationsService.getUser();
                var order = commonInformationsService.getOrderDetails();
                $scope.order = order;
                if ($scope.order.client.phoneNumber === '' && $scope.user.phoneNumber !== '') $scope.order.client.phoneNumber = $scope.user.phoneNumber;
                $scope.isUserLogged = isUserLogin();
                $scope.goToLogin = goToLogin;
                $scope.isSubmitEnable = isSubmitEnable;
                $scope.isSecondForm = {
                    value: order.isAnotherAddress ? 'true' : 'false'
                };
                $scope.secondForm = {
                    address: order.anotherAddress.address ? order.anotherAddress.address : '',
                    locality: order.anotherAddress.locality ? order.anotherAddress.locality : '',
                    zipCode: order.anotherAddress.zipCode ? order.anotherAddress.zipCode : ''
                };
                $scope.documentType = {
                    value: order.document ? order.document : 'bill'
                };
                $scope.valid = {
                    phoneNumber: false,
                    zipCode: false,
                    locality: false,
                    address: false
                };
                $scope.isValid = isValid;
                $scope.deliveryTypes = {
                    pharmacy: {
                        cost: 0,
                        text: 'Odbiór osobisty w aptece',
                        selected: (order.providerValue === 'pharmacy' || order.providerValue === '')
                    },
                    pocztex: {
                        cost: 9.99,
                        text: 'Poczta Polska',
                        selected: order.providerValue === 'pocztex'
                    },
                    dpd: {
                        cost: 10.99,
                        text: 'Kurier DPD',
                        selected: order.providerValue === 'dpd'
                    },
                    dhl: {
                        cost: 14.49,
                        text: 'Kurier DHL',
                        selected: order.providerValue === 'dhl'
                    }
                };
                $scope.payType = {
                    transfer: {
                        selected: (order.payType === 'transfer' || order.payType === '')
                    },
                    cash: {
                        selected: order.payType === 'cash'
                    }
                };
                $scope.deliveryTo = deliveryTo;
                $scope.selectPayment = selectPayment;
                $scope.submit = submit;

                function submit() {
                    var selectedTransportKey = Object.keys($scope.deliveryTypes).find(function (key) {
                        return $scope.deliveryTypes[key].selected === true;
                    });
                    var seledtedPayType = Object.keys($scope.payType).find(function (key) {
                        return $scope.payType[key].selected === true;
                    });
                    var isAnotherAdress = !($scope.deliveryTypes.pharmacy.selected || $scope.isSecondForm.value === 'false');
                    var order = {
                        priceTransport: $scope.deliveryTypes[selectedTransportKey].cost,
                        provider: $scope.deliveryTypes[selectedTransportKey].text,
                        providerValue: selectedTransportKey,
                        client: {
                            phoneNumber: $scope.order.client.phoneNumber
                        },
                        document: $scope.documentType.value,
                        isAnotherAddress: isAnotherAdress,
                        anotherAddress: {
                            locality: isAnotherAdress ? $scope.secondForm.locality : '',
                            address: isAnotherAdress ? $scope.secondForm.address : '',
                            zipCode: isAnotherAdress ? $scope.secondForm.zipCode : ''
                        },
                        payType: seledtedPayType
                    };
                    commonInformationsService.setOrderDetails(order);

                    $scope.onSubmit();
                }

                function deslectAll() {
                    Object.keys($scope.deliveryTypes).forEach(function (key) {
                        $scope.deliveryTypes[key].selected = false;
                    });
                }

                function selectPayment(type) {
                    if (type === 'transfer') {
                        $scope.payType.transfer.selected = true;
                        $scope.payType.cash.selected = false;
                    } else {
                        $scope.payType.transfer.selected = false;
                        $scope.payType.cash.selected = true;
                    }
                }

                function deliveryTo(place) {
                    switch (place) {
                        case 'pharmacy':
                            deslectAll();
                            $scope.deliveryTypes[place].selected = true;
                            break;
                        case 'pocztex':
                            if (errorAboutHomeDelivery()) {
                                deslectAll();
                                $scope.deliveryTypes[place].selected = true;
                            }
                            break;
                        case 'dpd':
                            if (errorAboutHomeDelivery()) {
                                deslectAll();
                                $scope.deliveryTypes[place].selected = true;
                            }
                            break;
                        case 'dhl':
                            if (errorAboutHomeDelivery()) {
                                deslectAll();
                                $scope.deliveryTypes[place].selected = true;
                            }
                            break;
                    }
                }

                function errorAboutHomeDelivery() {
                    if (!$scope.isDeliveryToHomePossible) {
                        $.notify('Nie jest możliwa dostawa do domu z powodu leków na receptę w koszyku', {
                            position: "top center",
                            className: "warn"
                        });
                        return false;
                    }
                    return true;
                }

                function isToHomePossible() {
                    var isAnyPrescription = cart.some(function (value) {
                        return value.medicine.withPrescription === true;
                    });

                    return !isAnyPrescription;
                }

                function isUserLogin() {
                    return !!$scope.user;
                }

                function goToLogin() {
                    $location.path(urlConstants.AUTHENTICATE)
                }

                function isValid(field, value) {
                    switch (field) {
                        case 'phoneNumber':
                            return $scope.valid[field] = /^\+?\d{9,15}$/.test(value);
                        case 'address':
                            return $scope.valid[field] = (value.length > 0);
                        case 'locality':
                            return $scope.valid[field] = (value.length > 0);
                        case 'zipCode':
                            return $scope.valid[field] = /^\d{2}-\d{3}$/.test(value);
                    }
                }

                function isSubmitEnable() {
                    if ($scope.isSecondForm.value === 'false' || $scope.deliveryTypes.pharmacy.selected) {
                        return $scope.valid.phoneNumber;
                    } else {
                        var isNotValid;
                        isNotValid = Object.keys($scope.valid).some(function (key) {
                            return !$scope.valid[key];
                        });

                        return !isNotValid;
                    }
                }
            }
        });

})();