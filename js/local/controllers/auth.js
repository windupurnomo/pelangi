app.controller('authController', function($rootScope, $scope, $location, localStorageService, Main) {
    $scope.token = getToken();

    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.signin(formData,
            function(res) {
                if (res.status == false) {
                    alert(res.message);
                } else {
                    saveToken(res.data.token);
                    window.location = "/";
                }
            }, function(res) {
                console.log(res.message);
                $rootScope.error = 'Failed to signin';
                //window.location = "/login";
            })
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        Main.save(formData, function(res) {
            if (res.type == false) {
                alert(res.data)
            } else {
                saveToken(res.data.token);
                window.location = "#/activation"
            }
        }, function() {
            $rootScope.error = 'Failed to signup';
        })
    };

    $scope.activate = function() {
        var formData = {
            email: $scope.email,
            activationCode: $scope.activationCode
        }

        Main.activate(formData, function(res) {
            if (res.status == false) {
                alert(res.message)
            } else {
                saveToken(res.data.token);
                window.location = "#/login"
            }
        }, function() {
            alert('Failed to activate account');
            $rootScope.error = 'Failed to activate account';
        })
    };

    $scope.resend = function(){
        var formData = {
            
        }
    }

    $scope.logout = function() {
        Main.logout(function() {
            window.location = "/"
        }, function() {
            alert("Failed to logout!");
        });
    };

    function saveToken(val) {
        localStorageService.set('token', val);
        $scope.token = val;
    }

    function getToken() {
        return localStorageService.get('token');
    }
});