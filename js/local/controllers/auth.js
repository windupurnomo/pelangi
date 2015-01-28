app.controller('authController', function($rootScope, $scope, $location, localStorageService, Main) {
    $scope.token = getToken();

    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.signin(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                saveToken(res.data.token);
                window.location = "/";
            }
        }, function() {
            $rootScope.error = 'Failed to signin';
        })
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }
        console.log(formData);

        Main.save(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                saveToken(res.data.token);
                window.location = "#/login"
            }
        }, function() {
            $rootScope.error = 'Failed to signup';
        })
    };

    $scope.me = function() {
        Main.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    };

    $scope.logout = function() {
        Main.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };

    function saveToken(val){
        localStorageService.set('token', val);
        $scope.token = val;
    }

    function getToken(){
        return localStorageService.get('token');
    }
});