angular.module('civicBot', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('login', {
        url: '/login.html',
        templateUrl: '/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/login.html',
        template: null,
        controller: 'LogoutCtrl'
      }
        $authProvider.loginUrl = "http://api.com/auth/login"; //direccion de la api que controla el login
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "login";
        $urlRouterProvider.otherwise('login.html'); //for invalid routes
      });

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }
  });
