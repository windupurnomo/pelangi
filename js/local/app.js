var app = angular.module("pelangi", ["ui.router", "LocalStorageModule"]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'authController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'authController'
        })

        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'authController'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html'
        })

        .state('list', {
            url: '/list',
            templateUrl: 'templates/list.html',
            controller: 'ListCtrl'
        })

        .state('list.item', {
            url: '/:item',
            templateUrl: 'templates/list.item.html',
            controller: function($scope, $stateParams) {
                $scope.item = $stateParams.item;
            }
        })

    $urlRouterProvider.otherwise('/home');

    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if (localStorageService.get('token')) {
                    config.headers.Authorization = 'Bearer ' + localStorageService.get('token');
                }
                return config;
            },
            'responseError': function(response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    });

});