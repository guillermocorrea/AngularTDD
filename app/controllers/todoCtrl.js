(function () {
	'use strict';

	angular
		.module('todo')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$scope'];
	function TodoController($scope) {
		var vm = this;
		activate();
		
		////////////////

		function activate() {
			$scope.list = ['test', 'execute', 'refactor'];
		}

		$scope.add = function (item) {
			$scope.list.push(item);
		};
	}
})();