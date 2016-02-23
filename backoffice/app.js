var civicBot = angular.module('civicBot', [ 'ngRoute' , 'angularUtils.directives.dirPagination' , 'xeditable' , 'services' ]);

civicBot.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
// Configuración de las rutas
civicBot.config(['$routeProvider',function($routeProvider) {

  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    })
    .when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'adminController'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);



civicBot.controller('loginController', [ '$scope' , function($scope) {
  $scope.login = function(data){

  };
}]);

civicBot.controller('adminController', ['$scope', '$http', function($scope, $http) {
  $scope.entradas = getData();

  $scope.getLabelList = getLabelList();
  $scope.getLocationList = getLocationList();
  $scope.getPartyList = getPartyList();

  $scope.guardar = function(data){

  };
  $scope.publicar = function(data){

  };
  $scope.despublicar = function(data){

  };
  $scope.logout = function(data){

  };
}]);
