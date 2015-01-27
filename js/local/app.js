var app = angular.module("pelangi", ["ui.router", "ngStorage"]);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: function ($scope, $localStorage){
                alert($localStorage.token);
                $scope.token = $localStorage.token;
            }
        }).state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'authController'
        }).state('register', {
            url: '/register',
            templateUrl: 'register.html',
            controller: 'authController'
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard.html'
        }).state('list', {
            url: '/list',
            templateUrl: 'templates/list.html',
            controller: 'ListCtrl'
        }).state('list.item', {
            url: '/:item',
            templateUrl: 'templates/list.item.html',
            controller: function($scope, $stateParams) {
                $scope.item = $stateParams.item;
            }
        })

    $urlRouterProvider.otherwise('/home');

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage',
        function($q, $location, $localStorage) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
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
        }
    ]);

});