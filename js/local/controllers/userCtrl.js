app.controller('userCtrl', function($scope, toaster, Main, localStorageService) {
    Main.me(function(res) {
        $scope.user = res.data;
    }, function() {
        $rootScope.error = 'Failed to fetch details';
    });

    $scope.saveUser = function (){
        Main.saveUser($scope.user,
            function(res) {
                if (!res.status) {
                    toaster.pop('error', "Update Profile", res.message);
                } else {
                    saveUser(res.data);
                    toaster.pop('success', "Update Profile", "Berhasil update profile");
                }
            }, function(res) {
                toaster.pop('error', "Ubah Profile", res.message);
            });
    }

    $scope.changepass = function (){
        var formData = {
            email: $scope.user.email,
            password: $scope.user.newpassword
        };

        Main.changepass(formData, 
            function (res){
                if(res.status){
                    toaster.pop('success', "Ubah Password", "Berhasil mengubah password");
                }else
                    toaster.pop('error', "Ubah Password", res.message);
            }, 
            function (res){
                alert(res);
            }
        );
    }

    function saveUser(val) {
        localStorageService.set('user', val);
        $scope.user = val;
    }

    function getUser() {
        return localStorageService.get('user');
    }
});