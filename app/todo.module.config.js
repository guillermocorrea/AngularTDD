(function () {
    'use strict';

    angular.module('todo')
        .run(runConfiguration);

    runConfiguration.$inject = ['$httpBackend'];

    function runConfiguration($httpBackend) {
        var todos = ['test', 'execute', 'refactor'];
        $httpBackend.whenGET('/api/todos')
            .respond(todos);

        $httpBackend.whenGET(/^.?/).passThrough();
    }
})();