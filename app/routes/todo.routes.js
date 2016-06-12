(function () {
    'use strict';

    angular.module('todo.routes')
        .config(config);

    config.$inject = ['$urlRouterProvider', '$stateProvider'];

    function config($urlRouterProvider, $stateProvider) {
        $urlRouterProvider
            .when('', '/home')
            .when('/', '/home')
            .otherwise(function ($injector) {
                $injector.get('$state').go('404', {}, { location: false });
            });

        var modalInstance;
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/app/views/home.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: '/app/views/about.html'
            })
            .state('todo', {
                url: '/todo',
                templateUrl: '/app/views/todos.html',
                controller: 'TodoController',
                controllerAs: '$ctrl',
                resolve: {
                    todos: function (todoService) {
                        return todoService.getAll().then(function (result) {
                            return { isValid: true, data: result.data };
                        }, function (error) {
                            return { isValid: false, error: error.data };
                        });
                    }
                }
            })
            .state('404', {
                templateUrl: '/app/views/404.html'
            });
    }
})();