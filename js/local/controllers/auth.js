app.controller('authController', function($scope, $location, localStorageService, Main, toaster) {
    $scope.user = getUser();
    $scope.token = $scope.user == null ? null : $scope.user.token;

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
                    //saveToken(res.data.token);
                    saveUser(res.data);
                    window.location = "/";
                }
            }, function(res) {
                console.log(res.message);
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
            // $rootScope.error = 'Failed to signup';
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

    function saveUser(val) {
        localStorageService.set('user', val);
        $scope.user = val;
    }

    function getUser() {
        return localStorageService.get('user');
    }
});