'use strict';

angular
    .module('todo.controllers')
    .controller('TodoController', TodoController);

TodoController.$inject = ['todoService', 'todos'];
function TodoController(todoService, todos) {
    var vm = this;
    vm.add = add;
    vm.remove = remove;
    
    init();

    function init() {
        if (todos && todos.isValid) {
            vm.list = todos.data;
        } else {
            vm.error = todos.error;
        }
    }

    function add(item) {
        vm.list.push(item);
    }

    function remove(item) {
        var idx = vm.list.indexOf(item);
        if (idx != -1) {
            vm.list.splice(idx, 1);
        }
    };
}