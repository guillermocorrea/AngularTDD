'use strict';

describe('todoService', function () {
    var $httpBackend = null,
        todoList = null,
        todoService = null;

    beforeEach(function () {
        angular.mock.module('todo.services');

        angular.mock.inject(function ($injector) {
            // Get dependencies
            $httpBackend = $injector.get('$httpBackend');
            todoService = $injector.get('todoService');

            // Set up mock data
            todoList = ['test', 'execute', 'refactor'];
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get todos successfuly', function () {
        // Arrange
        $httpBackend.whenGET('/api/todos')
            .respond(todoList);

        // Act
        var actualResult = todoService.getAll();
        $httpBackend.flush();
        actualResult.then(assertResponse);

        // Assert
        function assertResponse(result) {
            expect(result).toBeDefined();
            expect(result.data).toBeDefined();
            expect(angular.isArray(result.data)).toBeTruthy();
            expect(result.data).toEqual(todoList);
        }
    });

    it('should return 400 error getting todos', function () {
        // Arrange
        var errorMessage = { message: 'Error requesting todos' };
        $httpBackend.whenGET('/api/todos')
            .respond(400, errorMessage);

        // Act
        var actualResult = todoService.getAll();
        $httpBackend.flush();
        actualResult.then(assertResponse);

        // Assert
        function assertResponse(result) {
            expect(result).toBeDefined();
            expect(result.StatusCode).toEqual(400);
            expect(result.data).toBeDefined();
            expect(result.data).toEqual(errorMessage);
        }
    });
});