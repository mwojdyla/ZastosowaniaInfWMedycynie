angular.module("app").service("dataService", ["$q", "$http", dataService]);

function dataService($q, $http) {

    const baseApi = "";
    const REGISTER_URL = '/register';
    const LOGIN_URL = '/login';
    const LOGOUT_URL = '/logout';
    const USERS_URL = '/api/users';
    const SEND_EMAIL_URL = '/send-order-email';
    const SUBSTITUTES_URL = '/get_substitutes_strings';
    const ADD_MEDICINE_URL = '/add_medicine';

    return {
        getMedicines: getMedicines,
        getMedicineApplications: getMedicineApplications,
        getMedicineForms: getMedicineForms,
        getSubstancesForms: getSubstancesForms,
        getMedicineDetail: getMedicineDetail,
        register: register,
        login: login,
        logout: logout,
        getUserById: getUserById,
        getAllUsers: getAllUsers,
        updateUsersPermissions: updateUsersPermissions,
        addMedicine: addMedicine,
        sendEmailOrder: sendEmailOrder,
        getPotentialSubstituses: getPotentialSubstituses
    };

    function getPotentialSubstituses(callback) {
        $http({
            method: 'GET',
            url: SUBSTITUTES_URL
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback() {
        });
    }

    function sendEmailOrder(objectToSend, callback) {
        $http({
            method: 'POST',
            url: SEND_EMAIL_URL,
            data: JSON.stringify(objectToSend)
        }).then(function successCallback(response) {
            successMessage("Zamówienie zostało zrealizowane");
            callback();
        }, function errorCallback(response) {
            console.error('order ERROR')
        });
    }

    function addMedicine(medicine, callback) {
        $http({
            method: 'POST',
            url: ADD_MEDICINE_URL,
            data: JSON.stringify(medicine)
        }).then(function successCallback(response) {
            successMessage('Lek został dodany');
        }, function errorCallback(response) {
            console.error('REGISTER ERROR')
        });
        callback();
    }

    function updateUsersPermissions(payload) {
        return $http.post(baseApi + "/users/updateUsersPermissions", payload).then(
            function successCallback() {
                successMessage("Prawa użytkowników zostały zmienione.");
            }, function errorCallback() {
                console.error('updateUsersPermissions ERROR');
            });
    }

    function getAllUsers(callback) {
        return $http.get(baseApi + USERS_URL).then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {
                console.error('GET USERS ERROR');
            });
    }

    function getUserById(id, callback) {
        $http({
            method: 'GET',
            url: USERS_URL,
            params: {
                id: id
            }
        }).then(function successCallback(response) {
            callback(response.data[0]);
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
                callback(response.data[0]);
            }, function errorCallback(response) {
                console.error('GET MEDICINE DETAIL ERROR')
            });
    }

    function getMedicines(query, callback) {
        return $http.post(baseApi + "/medicines_filtering", query).then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {
                console.error('GET MEDICINES ERROR');
            });
    }

    function getMedicineApplications(callback) {
        return $http.get(baseApi + "/api/medicine_applications/").then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {
                console.error('GET APPLICATIONS ERROR');
            });
    }

    function getMedicineForms(callback) {
        return $http.get(baseApi + "/api/medicine_forms/").then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {
                console.error('GET FORMS ERROR');
            });
    }

    function getSubstancesForms(callback) {
        return $http.get(baseApi + "/api/substances/").then(
            function successCallback(response) {
                callback(response.data);
            }, function errorCallback() {
                console.error('GET SUBSTANCES ERROR');
            });
    }

    function errorMessage(message) {
        $.notify(message, {
            position: "top center",
            className: "error"
        });
    }

    function successMessage(message) {
        $.notify(message, {
            position: "top center",
            className: "success"
        });
    }
}
