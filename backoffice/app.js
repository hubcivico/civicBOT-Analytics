var app = angular.module('app', ["ngRoute" ,"angularUtils.directives.dirPagination"]);

// Configuración de las rutas
app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {

	$routeProvider.when('/admin', {
			templateUrl	: 'pages/admin.html',
			controller 	: 'adminController'
		}).when('/login', {
			templateUrl : 'pages/login.html',
			controller 	: 'loginController'
		}).otherwise({
			redirectTo: '/login'
		});
}]);


app.controller('adminController',['$scope','services', function($scope,$http,services) {
	var email = $scope.email;
	var password = $scope.password;
	$scope.login = function(email,password){
		services.login($scope.email,$scope.password);
	}
}]);


app.controller('loginController',['$scope','services', function($scope,$http,services) {
	$scope.entradas = services.getContributionList();

	$scope.guardar = function(data){
		services.setLabel(data.label.label);
		services.setParty(data.id,data.label.id);
		services.setMedia(data.id,data.media.id);
		services.setLocation(data.id,data.location.id);
	}
	$scope.publicar = function(){
		services.setToPublish(data.id,1);
	}
}]);
