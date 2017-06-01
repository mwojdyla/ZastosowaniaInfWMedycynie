(function () {
    'use strict';

    angular.module('app')
        .directive('addMedicine', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/admin/add-medicine/addMedicine.html',
                controller: ['$scope', 'dataService', Controller]
            };

            function Controller($scope, dataService) {
                dataService.getSubstancesForms(function(response) {
                   $scope.substancesTypes =  response;
                });
                $scope.unitTypes = ['g', 'ml'];
                $scope.minDate = new Date();
                $scope.formTypes = [
                    {
                        text: 'tabletki',
                        value: 'pill'
                    },
                    {
                        text: 'maść',
                        value: 'ointment'
                    },
                    {
                        text: 'zastrzyk',
                        value: 'injection'
                    },
                    {
                        text: 'aerosol',
                        value: 'aerosol'
                    },
                    {
                        text: 'czopki',
                        value: 'core'
                    }];
                $scope.applicationTypes = [
                    {
                        text: 'ból głowy',
                        value: 'Headache'
                    },
                    {
                        text: 'ból brzucha',
                        value: 'Stomachache'
                    },
                    {
                        text: 'ciśnienie',
                        value: 'AntiPressure'
                    },
                    {
                        text: 'alergia',
                        value: 'allergy'
                    }];
                $scope.valid = {
                    name: false,
                    producer: false,
                    price: false,
                    quantityInPackage: false,
                    unit: false,
                    imagePath: false,
                    withPrescription: false,
                    composition: false,
                    substitutes: false,
                    use: false,
                    form: false,
                    application: false,
                    validityPeriod: false
                };
                $scope.isValid = isValid;
                $scope.isConfirmEnable = isConfirmEnable;
                $scope.submit = submit;

                function isConfirmEnable() {
                    var isNotValid;
                    isNotValid = Object.keys($scope.valid).some(function (key) {
                        return !$scope.valid[key];
                    });

                    return !isNotValid;
                }

                function submit() {
                    dataService.addMedicine($scope.medicine, function(){
                        $scope.medicine = {};
                    })
                }

                function isValid(field, value) {
                    switch (field) {
                        case 'name':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'producer':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'price':
                            return $scope.valid[field] = isNumber(value);
                            break;
                        case 'quantityInPackage':
                            return $scope.valid[field] = isNumber(value);
                            break;
                        case 'unit':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'imagePath':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'withPrescription':
                            return $scope.valid[field] = isBool(value);
                            break;
                        case 'composition':
                            return $scope.valid[field] = isArray(value);
                            break;
                        case 'substitutes':
                            return $scope.valid[field] = isArray(value);
                            break;
                        case 'use':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'application':
                            return $scope.valid[field] = isArray(value);
                            break;
                        case 'form':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'validityPeriod':
                            return $scope.valid[field] = isDate(value);
                            break;
                    }
                }

                function isDate(value) {
                    return value instanceof Date;
                }

                function isText(value) {
                    return typeof value === 'string' && value.length > 0;
                }

                function isNumber(value) {
                    const regex = /^\+?(\d+(\.(\d+)?)?|\.\d+)$/;
                    return regex.test(value);
                }

                function isBool(value) {
                    return typeof value === 'boolean';
                }

                function isArray(value) {
                    return Array.isArray(value) && value.length > 0;
                }
            }
        });

})();
