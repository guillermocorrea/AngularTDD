'use strict';

describe('TodoController', function () {
    // scope -hold items on the controller
    var mockTodoService = null,
        data = null,
        $httpBackend = null,
        createController,
        $controller = null;

    beforeEach(function () {
        angular.mock.module('todo.services');
        angular.mock.module('todo.controllers');

        // inject - access angular controller
        angular.mock.inject(function ($injector) {
            // Set up $httpBackend
            $httpBackend = $injector.get('$httpBackend');

            // Get controller dependencies
            $controller = $injector.get('$controller');
            mockTodoService = $injector.get('todoService');

            // Set up spy and call actual implementation
            spyOn(mockTodoService, 'getAll').and.callThrough();

            // Get the controller instance
            createController = function (todos) {
                if (!todos) {
                    todos = { isValid: true, data: ['test', 'execute', 'refactor'] };
                }
                $httpBackend.whenGET('/api/todos')
                    .respond(['test', 'execute', 'refactor'], { TOTAL_COUNT: 3 });
                var controller = $controller('TodoController', {
                    todoService: mockTodoService,
                    todos: todos
                });
                return controller;
            };
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should define a list object', function () {
        var controller = createController();
        expect(controller.list).toBeDefined();
        expect(controller.list[0]).toEqual('test');
        expect(controller.list[1]).toEqual('execute');
        expect(controller.list[2]).toEqual('refactor');
    });

    it('should define error when requesting todos fail', function () {
        var errorMessage = { message: 'Error requesting todos' };
        var controller = createController({ isValid: false, error: errorMessage });
        expect(controller.list).toBeUndefined();
        expect(controller.error).toBeDefined();
        expect(controller.error).toEqual(errorMessage);
    });

    describe('when adding an item to to-do list', function () {
        it('should add item to last item in list', function () {
            var controller = createController();
            var newItem = 'repeat';
            controller.add(newItem);
            var lastIndexOfList = controller.list.length - 1;
            expect(controller.list[lastIndexOfList]).toEqual(newItem);
        });
    });

    describe('when removing an item in list', function () {
        it('should contains 2 list items', function () {
            var controller = createController();
            controller.remove('refactor');
            expect(controller.list.length).toBe(2);
        });
    });

    describe('when removing an item in that does not exists in list', function () {
        it('should contains 3 list items', function () {
            var controller = createController();
            controller.remove('not an item');
            expect(controller.list.length).toBe(3);
        });
    });
});