angular.module("app").factory("dataService", ["$q", "$http", function ($q, $http) {

    var baseApi = "";

    function getMedicineDetail(id, callback) {
        return $http.get(baseApi + "/api/medicines/" + id).then(
          function successCallback(response) {
            callback(response.data);
          }, function errorCallback() {
            errorComunicate();
          });;
    };

    function getMedicines(query) {
        return $http.post(baseApi + "/api/getMedicines", query);
    };

    function getMedicineApplications() {
      return $http.get(baseApi + "/api/medicine_applications/");
    };

    function getMedicineForms() {
      return $http.get(baseApi + "/api/medicine_forms/");
    };

    function getSubstancesForms() {
      return $http.get(baseApi + "/api/substances/").then(
        function successCallback(response) {
          callback(response.data);
        }, function errorCallback() {
          errorComunicate();
        });
    };


    return {
        getMedicines: getMedicines,
        getMedicineApplications: getMedicineApplications,
        getMedicineForms: getMedicineForms,
        getSubstancesForms: getSubstancesForms,
        getMedicineDetail: getMedicineDetail
    }

}]);
