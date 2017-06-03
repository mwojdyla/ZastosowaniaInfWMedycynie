(function () {
    'use strict';

    angular.module('app')
        .service('commonInformationsService', [commonInformationsService]);

    function commonInformationsService() {
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
        cart = [{
            medicine: {
                id: 1,
                name: 'Ibumprom',
                producer: 'firma1',
                quantityInPackage: '100',
                unit: 'g',
                application: ['Headache'],
                form: 'pill',
                price: 100,
                imagePath: 'https://www.e-zikoapteka.pl/acc-optima-600mg-tabletki-musujace-10-szt.jpg',
                withPrescription: false
            },
            quantity: 2
        }];

        return {
            setUser: setUser,
            getUser: getUser,
            getCart: getCart,
            removeFromCart: removeFromCart,
            removeWholeCart: removeWholeCart,
            addToCart: addToCart,
            getOrderDetails: getOrderDetails,
            setOrderDetails: setOrderDetails,
            removeWholeOrder: removeWholeOrder
        };

        function removeWholeOrder() {
            orderDetails = {};
        }

        function getOrderDetails() {
            return angular.copy(orderDetails);
        }

        function setOrderDetails(order) {
            Object.keys(order).forEach(function(key) {
                orderDetails[key] = order[key];
            })
        }

        function addToCart(medicine, howMany) {
            var element = {
                medicine: medicine,
                quantity: howMany
            };

            cart.push(element);
        }

        function getCart() {
            return angular.copy(cart);
        }

        function removeWholeCart() {
            cart = [];
        }

        function removeFromCart(medicineId) {
            var index = cart.findIndex(function (value) {
                return value.medicine.id === medicineId;
            });

            if (index !== -1) cart.splice(index, 1);
        }

        function setUser(newUser) {
            user = newUser;
        }

        function getUser() {
            return angular.copy(user);
        }
    }

})();
