angular.module("app").service("dataService", ["$q", "$http", dataService]);

function dataService($q, $http) {

    const baseApi = "";
    const REGISTER_URL = '/register';
    const LOGIN_URL = '/login';
    const LOGOUT_URL = '/logout';
    const USERS_URL = '/api/users';

    return {
        getMedicines: getMedicines,
        getMedicineApplications: getMedicineApplications,
        getMedicineForms: getMedicineForms,
        getSubstancesForms: getSubstancesForms,
        getMedicineDetail: getMedicineDetail,
        register: register,
        login: login,
        logout: logout,
        getUserById: getUserById
    };

    function getUserById(id, callback) {
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

    function logout(callback) {
        $http({
            method: 'POST',
            url: LOGOUT_URL
        }).then(function successCallback() {
            callback();
        }, function errorCallback() {

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
            errorMessage('Błąd rejestracji. Spróbuj ponownie');
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
            errorMessage('Błąd logowania. Spróbuj ponownie');
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

    function errorMessage(message) {
        $.notify(message, {
            position: "top center",
            className: "error"
        });
    }
}
