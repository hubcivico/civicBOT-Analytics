angular.module('login')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('/api/me'); //introducir la url con la información del usuario
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });
