angular.module('app')
    .service('eventsService', ['$rootScope', eventsService]);

function eventsService($rootScope) {
    return {
        subscribe: subscribe,
        notify: notify
    };

    function subscribe(scope, name, callback) {
        var handler = $rootScope.$on(name, callback);
        scope.$on('$destroy', handler);
    }

    function notify(name, args) {
        $rootScope.$emit(name, args);
    }
};