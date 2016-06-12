'use strict';

describe('todo.module.config', function () {
    var $httpBackend,
        todosList;

    beforeEach(function () {
        todosList = ['test', 'execute', 'refactor'];
        angular.mock.module('ngMockE2E', function ($provide) {
            $provide.value('$httpBackend', {
                whenGET: jasmine.createSpy().and.callFake(function () {
                    return this;
                }),
                respond: jasmine.createSpy(),
                passThrough: jasmine.createSpy()
            });
        });
        angular.mock.module('todo');
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
        });
    });


    describe('run configuration block', function () {
        it('should set up $httpBackend calls', function () {
            expect($httpBackend.whenGET).toHaveBeenCalledWith('/api/todos');
            expect($httpBackend.respond).toHaveBeenCalledWith(todosList);
            expect($httpBackend.whenGET).toHaveBeenCalledWith(/^.?/);
            expect($httpBackend.passThrough).toHaveBeenCalled();
        });
    });
});