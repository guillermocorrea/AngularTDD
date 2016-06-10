describe('when using a to-do list', function () {
	// scope -hold items on the controller
	var scope = null,
		$rootScope = null,
		mockTodoService = null,
		$httpBackend = null,
		createController,
		$controller = null;

	beforeEach(function () {
		module('todo.services');
		module('todo.controllers');

		// inject - access angular controller
		inject(function ($injector) {
			// Set up $httpBackend
			$httpBackend = $injector.get('$httpBackend');

			// Get controller dependencies
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			mockTodoService = $injector.get('todoService');

			// Set up spy and call actual implementation
			spyOn(mockTodoService, 'getAll').and.callThrough();

			// Get the controller instance
			createController = function () {
				scope = $rootScope.$new();
				$httpBackend.whenGET('/api/todos')
					.respond(['test', 'execute', 'refactor'], { TOTAL_COUNT: 3 });
				var controller = $controller('TodoController', { $scope: scope, todoService: mockTodoService });
				$httpBackend.flush();
				return controller;
			};
		});
	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should define a list object', function () {
		createController();
		expect(mockTodoService.getAll).toHaveBeenCalled();
		expect(scope.list).toBeDefined();
	});

	it('should define error when requesting todos fail', function () {
		var errorMessage = { message: 'Error requesting todos' };
		$httpBackend.whenGET('/api/todos')
			.respond(400, errorMessage);
		createController();
		expect(mockTodoService.getAll).toHaveBeenCalled();
		expect(scope.list).toBeUndefined();
		expect(scope.error).toBeDefined();
		expect(scope.error).toEqual(errorMessage);
	});

	it('should define a list object', function () {
		createController();
		expect(scope.list[0]).toEqual('test');
	});

	it('should define a list object', function () {
		createController();
		expect(scope.list[1]).toEqual('execute');
	});

	it('should define a list object', function () {
		createController();
		expect(scope.list[2]).toEqual('refactor');
	});

	describe('when adding an item to to-do list', function () {
		var newItem = 'repeat';

		beforeEach(function () {
			createController();
			scope.add(newItem);
		});

		it('should add item to last item in list', function () {
			var lastIndexOfList = scope.list.length - 1;
			expect(scope.list[lastIndexOfList]).toEqual(newItem);
		});
	});

	describe('when removing an item in list', function () {
		beforeEach(function () {
			createController();
			scope.remove('refactor');
		});

		it('should contains 2 list items', function () {
			expect(scope.list.length).toBe(2);
		});
	});
});