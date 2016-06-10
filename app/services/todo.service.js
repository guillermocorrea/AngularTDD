(function () {
    'use strict';

    angular
        .module('todo.services')
        .factory('todoService', TodoService);

    TodoService.$inject = ['$http'];

    function TodoService($http) {
        var service = {
            getAll: getAll
        };

        return service;

        ////////////////
        function getAll() {
            return $http.get('/api/todos');
        }
    }
})();