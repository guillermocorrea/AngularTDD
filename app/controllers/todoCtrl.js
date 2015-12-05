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

		$scope.remove = function (item) {
			var idx = $scope.list.indexOf(item);
			if (idx != -1) {
				$scope.list.splice(idx, 1);
			}
		};
	}
})();