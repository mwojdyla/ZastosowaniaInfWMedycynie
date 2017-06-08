(function () {
    'use strict';

    angular.module('app')
        .directive('addMedicine', function () {
            return {
                restrict: 'E',
                scope: {},
                templateUrl: 'static/main-view/admin/add-medicine/addMedicine.html',
                controller: ['$scope', 'dataService', 'utilsService', Controller]
            };

            function Controller($scope, dataService, utilsService) {
                dataService.getSubstancesForms(function (substances) {
                    $scope.substancesTypes = substances;
                });
                dataService.getMedicineForms(function (forms) {
                    $scope.formTypes = forms;
                });
                dataService.getMedicineApplications(function (applications) {
                    $scope.applicationTypes = applications;
                });
                dataService.getPotentialSubstituses(function (substitutes) {
                    $scope.substitutes = substitutes;
                });
                $scope.unitTypes = ['g', 'ml', 'sztuki'];
                $scope.minDate = new Date();
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
                    applications: false,
                    validityPeriod: false,
                    quantityInWarehouse: false
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
                    var objectToSend = angular.copy($scope.medicine);
                    objectToSend.validityPeriod = utilsService.parseDateToString(objectToSend.validityPeriod);
                    dataService.addMedicine(objectToSend);
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
                        case 'quantityInWarehouse':
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
                        case 'applications':
                            return $scope.valid[field] = isArrayNotEmpty(value);
                            break;
                        case 'substitutes':
                            return $scope.valid[field] = true;
                            break;
                        case 'use':
                            return $scope.valid[field] = isText(value);
                            break;
                        case 'application':
                            return $scope.valid[field] = isArrayNotEmpty(value);
                            break;
                        case 'composition':
                            return $scope.valid[field] = isArrayNotEmpty(value);
                            break;
                        case 'form':
                            return $scope.valid[field] = isNumber(value);
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

                function isArrayNotEmpty(value) {
                    return Array.isArray(value) && value.length > 0;
                }
            }
        });

})();
