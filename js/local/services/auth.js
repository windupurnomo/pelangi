app.factory('Main',
    function($http, localStorageService) {
        // var baseUrl = "http://ec2-54-152-244-35.compute-1.amazonaws.com:9000/api";
        var baseUrl = "http://localhost:3002/api";

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = localStorageService.get('token');
            var user = {};
            if (token != null) {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/register', data).success(success).error(error)
            },
            saveUser: function(data, success, error) {
                $http.post(baseUrl + '/user/save', data).success(success).error(error)
            },
            users: function (success, error){
                $http.get(baseUrl + '/users').success(success).error(error);
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/login', data).success(success).error(error)
            },
            activate: function(data, success, error){
                $http.post(baseUrl + '/activation', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/dashboard').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                localStorageService.remove('user');
                success();
            },
            changepass: function (data, success, error){
                $http.post(baseUrl + '/changepass', data).success(success).error(error);
            },
            disable: function (data, success, error){
                $http.post(baseUrl + '/user/disable/', data).success(success).error(error)
            }
        };
    }
);