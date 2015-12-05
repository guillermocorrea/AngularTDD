describe('when using a to-do list', function () {
	// scope -hold items on the controller
	var scope = {};

	beforeEach(function () {
		module('todo');
		
		// inject - access angular controller
		inject(function ($controller) {
			// initialize controller with test scope
			$controller('TodoController', { $scope: scope });
		});
	});

	it('should define a list object', function () {
		expect(scope.list).toBeDefined();
	});

	it('should define a list object', function () {
		expect(scope.list[0]).toEqual('test');
	});

	it('should define a list object', function () {
		expect(scope.list[1]).toEqual('execute');
	});

	it('should define a list object', function () {
		expect(scope.list[2]).toEqual('refactor');
	});

	describe('when adding an item to to-do list', function () {
		var newItem = 'repeat';

		beforeEach(function () {
			scope.add(newItem);
		});

		it('should add item to last item in list', function () {
			var lastIndexOfList = scope.list.length - 1;
			expect(scope.list[lastIndexOfList]).toEqual(newItem);
		});
	});
	
	describe('when removing an item in list', function() {
		beforeEach(function() {
			scope.remove('refactor');
		});
		
		it('should contains 2 list items', function() {
			expect(scope.list.length).toBe(2);
		});
	});
});