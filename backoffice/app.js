var civicBot = angular.module('civicBot', ['ngRoute', 'angularUtils.directives.dirPagination', 'xeditable' ]);

civicBot.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
// Configuración de las rutas
civicBot.config(function($routeProvider) {

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
});



civicBot.controller('loginController', function($scope) {});

civicBot.controller('adminController', ['$scope', '$http', function($scope, $http) {

$scope.rowCollection = [];
$http.get('http://jsonplaceholder.typicode.com/photos').
success(function(data, status, headers, config) {
  $scope.rowCollection = data;
}).
error(function(data, status, headers, config) {
  // log error
});

$scope.getLocationList = [];
$scope.loadLocationList = function() {
  return $scope.getLocationList.length ? null : $http.get('/getLocationList').success(function(data) {
    $scope.getLocationList = data;
  });
};

$scope.getPartyList = [];
$scope.loadPartyList = function() {
  return $scope.getPartyList.length ? null : $http.get('/getPartyList').success(function(data) {
    $scope.getPartyList = data;
  });
};

$scope.showLocation = function(user) {
  if (row.url && $scope.getLocationList.length) {
    var selected = $filter('filter')($scope.getLocationList, {
      id: row.url
    });
    return selected.length ? selected[0].text : 'Vacio';
  }
};

$scope.showParty = function(user) {
  var selected = [];
  if (row.thumbnailUrl) {
    selected = $filter('filter')($scope.statuses, {
      value: user.status
    });
  }
  return selected.length ? selected[0].text : 'Not set';
};


}]);
