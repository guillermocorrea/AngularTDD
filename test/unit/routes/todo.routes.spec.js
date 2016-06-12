'use strict';

describe('todo.routes', function () {
    var $state,
        $stateParams,
        $q,
        $templateCache,
        $location,
        $rootScope,
        $injector,
        deferedTodos,
        todosMockList,
        todoService;

    function mockTemplate(templateRoute, tmpl) {
        $templateCache.put(templateRoute, tmpl || templateRoute);
    }

    function goFrom(url) {
        return {
            toState: function (state, params) {
                $location.replace().url(url); //Don't actually trigger a reload
                $state.go(state, params);
                $rootScope.$digest();
            }
        };
    }

    beforeEach(function () {
        angular.mock.module('todo.test.templates'); // html templates module
        angular.mock.module('todo.services');
        angular.mock.module('todo.routes');
        this.routes = {
            'home': {
                state: 'home',
                url: '/home',
                templateUrl: '/app/views/home.html'
            },
            'todo': {
                state: 'state',
                url: '/todo',
                templateUrl: '/app/views/home.html',
                controller: 'TodoController',
                controllerAs: '$ctrl'
            },
            'about': {
                state: 'about',
                url: '/about',
                templateUrl: '/app/views/about.html'
            },
            '404': {
                templateUrl: '/app/views/404.html'
            }
        };
    });

    beforeEach(inject(function (_$state_, _$stateParams_, _$q_, _$templateCache_, _$location_, _$rootScope_, _$injector_) {
        $state = _$state_;
        $stateParams = _$stateParams_;
        $q = _$q_;
        $templateCache = _$templateCache_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $injector = _$injector_;
        todoService = $injector.get('todoService');
        deferedTodos = $q.defer();
        todosMockList = ['red', 'green', 'refactor'];
    }));

    describe('path', function () {
        function goTo(url) {
            $location.url(url);
            $rootScope.$digest();
        }

        beforeEach(function () {
            mockTemplate(this.routes.home.templateUrl);
            mockTemplate(this.routes.todo.templateUrl);
            mockTemplate(this.routes.about.templateUrl);

            deferedTodos.resolve(todosMockList);
            spyOn(todoService, 'getAll').and.returnValue(deferedTodos.promise);
        });

        describe('when empty', function () {
            it('should go to home state', function () {
                goTo('');
                debugger;
                expect($state.current.name).toEqual('home');
            });
        });

        describe('/', function () {
            it('should go to home state', function () {
                goTo('/');
                expect($state.current.name).toEqual('home');
            });
        });

        describe('/home', function () {
            it('should go to the home state', function () {
                goTo('/home');
                expect($state.current.name).toEqual('home');
            });
        });

        describe('/about', function () {
            it('should go to the about state', function () {
                goTo('/about');
                expect($state.current.name).toEqual('about');
            });
        });

        describe('otherwise', function () {
            beforeEach(function () {
                mockTemplate('/app/views/404.html');
            });

            it('should go to the 404 state', function () {
                goTo('someNonExistentUrl');
                expect($state.current.name).toEqual('404');
            });

            it('should not change the url', function () {
                var badUrl = '/someNonExistentUrl';
                goTo(badUrl);
                expect($location.url()).toEqual(badUrl);
            });
        });
    });


    describe('state', function () {
        function resolve(value) {
            return {
                forStateAndView: function (state, view) {
                    var viewDefinition = view ? $state.get(state).views[view] : $state.get(state);
                    return $injector.invoke(viewDefinition.resolve[value]);
                }
            };
        }

        beforeEach(function () {
            mockTemplate('/app/views/home.html');
            spyOn(todoService, 'getAll').and.returnValue(deferedTodos.promise);
        });

        describe('todo', function () {
            it('should resolve todos when todoService responds ok', function () {
                var resolvePromise = resolve('todos').forStateAndView('todo');
                deferedTodos.resolve({ data: todosMockList });
                resolvePromise.then(function (result) {
                    expect(todoService.getAll).toHaveBeenCalled();
                    expect(result).toBeDefined();
                    expect(result.isValid).toBeDefined();
                    expect(result.isValid).toBeTruthy();
                    expect(result.data).toBeDefined();
                    expect(angular.isArray(result.data)).toBeTruthy();
                    expect(result.data).toEqual(todosMockList);
                });
                $rootScope.$digest();
            });

            it('should resolve todos when todoService responds error', function () {
                var resolvePromise = resolve('todos').forStateAndView('todo');
                var errorMessage = { message: 'Error message' };
                resolvePromise.then(null, function (result) {
                    expect(todoService.getAll).toHaveBeenCalled();
                    expect(result).toBeDefined();
                    expect(result.isValid).toBeDefined();
                    expect(result.isValid).toBeFalsy();
                    expect(result.error).toBeDefined();
                    expect(result.error).toEqual(errorMessage);
                });
                deferedTodos.reject({ error: todosMockList });
                $rootScope.$digest();
            });
        });
    });
});
