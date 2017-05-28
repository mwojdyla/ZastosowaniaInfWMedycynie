angular.module("app").service("dataService", ["$q", "$http", dataService]);

function dataService($q, $http) {

    const baseApi = "";
    const REGISTER_URL = '/register';
    const LOGIN_URL = '/login';
    const USERS_URL = '/api/users';

    return {
        getMedicines: getMedicines,
        getMedicineApplications: getMedicineApplications,
        getMedicineForms: getMedicineForms,
        getSubstancesForms: getSubstancesForms,
        getMedicineDetail: getMedicineDetail,
        register: register,
        login: login,
        getUserById: getUserById
    };

    function getUserById(id) {
        $http({
            method: 'GET',
            url: USERS_URL,
            params: {
                id: id
            }
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            console.error('REGISTER ERROR')
        });
    }

    function register(dataUser, callback) {
        $http({
            method: 'POST',
            url: REGISTER_URL,
            data: JSON.stringify(dataUser)
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            console.error('REGISTER ERROR')
        });
    }

    function login(dataUser, callback) {
        $http({
            method: 'POST',
            url: LOGIN_URL,
            data: JSON.stringify(dataUser)
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback(response) {
            console.error('LOGIN ERROR')
        });
    }

    function getMedicineDetail(id, callback) {
        return $http.get(baseApi + "/api/medicines/" + id).then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {

            });
    }

    function getMedicines(query) {
        return $http.post(baseApi + "/api/getMedicines", query);
    }

    function getMedicineApplications() {
        return $http.get(baseApi + "/api/medicine_applications/");
    }


    function getMedicineForms() {
        return $http.get(baseApi + "/api/medicine_forms/");
    }

    function getSubstancesForms() {
        return $http.get(baseApi + "/api/substances/").then(
            function successCallback(response) {

            }, function errorCallback() {

            });
    }
}
