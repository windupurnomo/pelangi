app.controller('adminCtrl', function ($scope, Main, toaster){
	Main.users(
		function (res) {
			if (res.status){
				$scope.user = res.data.user;
				$scope.users = res.data.users;
			}else
				alert(res.message);
		},function (res){
			
		}
	);

	$scope.disable = function (u, status){
		var data = {
			email: u.email,
			status: status
		};
		u.status = "1";
		console.log(data);
		Main.disable(data, 
			function (res){
				if (res.status){
					u.status = status;
					toaster.pop('success', "Disable User", "Berhasil disable user " + u.username);
				}
				else
					toaster.pop('error', "Disable User", res.message);
			}, 
			function (res){
				toaster.pop('error', "Disable User", res.message);
		});
	}
});