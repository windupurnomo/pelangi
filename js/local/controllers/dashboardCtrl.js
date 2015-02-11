app.controller('dashboardCtrl', function($rootScope, $scope, $location, Main) {
    Main.me(function(res) {
        $scope.user = res.data;
    }, function() {
        $rootScope.error = 'Failed to fetch details';
    });

    $scope.saveUser = function (){
        Main.saveUser($scope.user,
            function(res) {
                if (!res.status) {
                    alert(res.message);
                } else {
                	console.log(res.data);
                }
            }, function(res) {
                console.log(res.message);
                $rootScope.error = 'Failed to saveUser';
                //window.location = "/login";
            })
    }

    $scope.changepass = function (){
        var formData = {
            email: $scope.user.email,
            password: $scope.user.newpassword
        };

        Main.changepass(formData, 
            function (res){
                if(res.status){
                    alert('success change password');
                    window.location = "#/dashboard/home"
                }else
                    alert(res.message);
            }, 
            function (res){
                alert(res);
            }
        );
    }
});