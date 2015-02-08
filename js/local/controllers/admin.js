app.controller('adminCtrl', function ($scope, Main){
	Main.users(
		function (res) {
			if (res.status){
				console.log(res.data.users);
				$scope.user = res.data.user;
				$scope.users = res.data.users;
			}else
				alert(res.message);
		},function (res){
			
		}
	);
});