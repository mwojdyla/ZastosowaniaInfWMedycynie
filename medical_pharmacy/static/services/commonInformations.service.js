(function () {
    'use strict';

    angular.module('app')
        .service('commonInformationsService', ['eventsService', 'typeEvents', commonInformationsService]);

    function commonInformationsService(eventsService, typeEvents) {
        var user, orderDetails, cart;
        orderDetails = {
            priceTransport: '',
            provider: '',
            providerValue: '',
            client: {
                phoneNumber: ''
            },
            document: '',
            isAnotherAddress: false,
            anotherAddress: {
                locality: '',
                address: '',
                zipCode: ''
            },
            payType: ''
        };
        cart = [];

        return {
            setUser: setUser,
            getUser: getUser,
            getCart: getCart,
            removeFromCart: removeFromCart,
            removeWholeCart: removeWholeCart,
            addToCart: addToCart,
            updateQuantityElementInCart:updateQuantityElementInCart,
            getOrderDetails: getOrderDetails,
            setOrderDetails: setOrderDetails,
            removeWholeOrder: removeWholeOrder
        };

        function updateQuantityElementInCart(index, quantity) {
            cart[index].quantity = quantity;
        }

        function removeWholeOrder() {
            orderDetails = {
                priceTransport: '',
                provider: '',
                providerValue: '',
                client: {
                    phoneNumber: ''
                },
                document: '',
                isAnotherAddress: false,
                anotherAddress: {
                    locality: '',
                    address: '',
                    zipCode: ''
                },
                payType: ''
            };
        }

        function getOrderDetails() {
            return angular.copy(orderDetails);
        }

        function setOrderDetails(order) {
            Object.keys(order).forEach(function (key) {
                orderDetails[key] = order[key];
            })
        }

        function addToCart(medicine, howMany) {
            var element = {
                medicine: medicine,
                quantity: howMany
            };

            var existingMedicine = cart.find(function (item) {
                return item.medicine.id === element.medicine.id;
            });
            if (existingMedicine !== undefined) {
                existingMedicine.quantity += howMany;
            }
            else {
                cart.push(element);
            }

            removeWholeOrder();
            eventsService.notify(typeEvents.CART_CHANGED);
        }

        function getCart() {
            return angular.copy(cart);
        }

        function removeWholeCart() {
            cart = [];
            eventsService.notify(typeEvents.CART_CHANGED);
        }

        function removeFromCart(medicineId) {
            var index = cart.findIndex(function (value) {
                return value.medicine.id === medicineId;
            });

            if (index !== -1) {
                cart.splice(index, 1);
                eventsService.notify(typeEvents.CART_CHANGED);
            }
        }

        function setUser(newUser) {
            user = newUser;
        }

        function getUser() {
            return angular.copy(user);
        }
    }

})();
