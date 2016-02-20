angular.module('civicBot')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('Te has conectado!');
          $location.path('index.html');
        })
        .catch(function(error) {
          toastr.error(error.data.message, error.status);
        });
    };
});
