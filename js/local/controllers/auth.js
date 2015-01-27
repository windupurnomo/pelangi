app.controller('authController', function($rootScope, $scope, $location, $localStorage, Main) {
    $scope.token = $localStorage.token;
    $scope.test = "test";

    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.signin(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                $localStorage.token = res.data.token;
                $scope.token = res.data.token;
                $scope.test = 'success';
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
                $localStorage.token = res.data.token;
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
});