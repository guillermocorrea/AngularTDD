(function () {
    'use strict';

    angular.module('todo', [
        'todo.controllers',
        'todo.services',
        'todo.routes',
        // Vendors
        'ngMockE2E'
    ]);
})();