angular.module('login')
  .controller('SignupCtrl', function($scope, $location, $auth, toastr) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $location.path('/index.html');
          toastr.info('Has creado una nueva cuenta y has entrado satisfactoriamente.');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });
