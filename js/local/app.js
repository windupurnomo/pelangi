var app = angular.module("pelangi", ['ngAnimate', 'toaster', "ui.router", "LocalStorageModule"]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            abstract: true,
            templateUrl: 'templates/home.html',
            controller: 'authController'
        })

        .state('home.home', {
            url: '',
            templateUrl: 'templates/home2.html'
        })

        .state('home.about', {
            url: '/about',
            templateUrl: 'templates/about.html'
        })

        .state('home.contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html'
        })

        .state('home.login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'authController'
        })

        .state('home.register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'authController'
        })

        .state('home.activation', {
            url: '/activation',
            templateUrl: 'templates/activation.html',
            controller: 'authController'
        })

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html'
        })

        .state('dashboard.home', {
            url: '/home',
            templateUrl: 'templates/dashboardhome.html'
        })

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html'
        })
        
        .state('usermag', {
            url: '/usermag',
            templateUrl: 'templates/usermag.html'
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

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(function($q, $location, localStorageService) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                var user = localStorageService.get('user');
                var token = user == null ? null : user.token;
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
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