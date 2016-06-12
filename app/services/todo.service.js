(function () {
    'use strict';

    function TodoService($http, $q) {
        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $q(function (resolve, reject) {
                $http.get('/api/todos').then(function (result) {
                    return resolve(result);
                }, function (rejectReason) {
                    return reject(rejectReason);
                });
            });
        }
    }

    angular
        .module('todo.services')
        .factory('todoService', TodoService);

    TodoService.$inject = ['$http', '$q'];
})();