angular.module('login', ['ngResource', 'ngMessages', 'ngAnimate', 'toastr', 'ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('login', {
        url: '/login.html',
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/index.html',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('signup', {
        url: '/login.html',
        templateUrl: 'login.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
        $authProvider.loginUrl = "http://api.com/auth/login"; //direccion de la api que controla el login
        $authProvider.signupUrl = "http://api.com/auth/signup"; //direccion de la api que controla el registro
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "login",
      });

    $urlRouterProvider.otherwise('/login.html'); //for invalid routes

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login.html');
      }
      return deferred.promise;
    }
  });
