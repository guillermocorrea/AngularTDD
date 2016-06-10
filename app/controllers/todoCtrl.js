(function () {
	'use strict';

	angular
		.module('todo.controllers')
		.controller('TodoController', TodoController);

	TodoController.$inject = ['$scope', 'todoService'];
	function TodoController($scope, todoService) {
		var vm = this;
		activate();

		////////////////

		function activate() {
			todoService.getAll().then(function (result) {
				$scope.list = result.data;
			}, function (error) {
				$scope.error = error.data;
			});
		}

		$scope.add = function (item) {
			$scope.list.push(item);
		};

		$scope.remove = function (item) {
			var idx = $scope.list.indexOf(item);
			if (idx != -1) {
				$scope.list.splice(idx, 1);
			}
		};
	}
})();