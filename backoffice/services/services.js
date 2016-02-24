angular.module('app',[])
    .service('service', ['$http', 'ngStorage', '$location' , function ($http,$localStorage,$location) {

        this.login = function (email, password, callback) {
          return $http.get('/Private/login', {
              email: email,
              password: password
            })
            .success(function(response) {
              callback(response);
              $localStorage = response.token;
              $location.path('#/admin');
            });
        };

        this.logout = function () {
            return $http.get('/Private/logout', {
                headers: {
                  'Authorization': 'Bearer' + $localStorage.token
                }
              })
              .success(function(response) {
                callback(response);
              });
        };

        this.setParty = function (contribId,partyId) {
            return http({
              method: 'POST',
              url: '/Private/setParty',
              data: {
                contribId: contribId,
                partyId: partyId
              },
              headers: {
                'Authorization': 'Bearer ' + $localStorage.token
                  }
            });
        };
        this.setMedia = function (contribId,mediaId) {
            return http({
              method: 'POST',
              url: '/Private/setMedia',
              data: {
                contribId: contribId,
                mediaId: mediaId
              },
              headers: {
                'Authorization': 'Bearer ' + $localStorage.token
                  }
            });
        };
        this.setLocation = function (contribId,locationId) {
            return http({
              method: 'POST',
              url: '/Private/setLocation',
              data: {
                contribId: contribId,
                locationId: locationId
              },
              headers: {
                'Authorization': 'Bearer ' + $localStorage.token
                  }
            });
        };
        this.setLabel = function (contribId,labelId) {
            return http({
              method: 'POST',
              url: '/Private/setLabel',
              data: {
                contribId: contribId,
                labelId: labelId
              },
              headers: {
                'Authorization': 'Bearer ' + $localStorage.token
                  }
            });
        };
        this.setToPublish = function (contribId,publish) {
            return http({
              method: 'POST',
              url: '/Private/setToPublish',
              data: {
                contribId: contribId,
                publish: publish
              },
              headers: {
                'Authorization': 'Bearer ' + $localStorage.token
                  }
            });
        };
        this.getPartyList = function(data) {
          var getPartyList = [];
          $http({
            method: 'GET',
            url: '/Private/getPartyList',
            headers: {
              'Authorization': 'Bearer ' + $localStorage.token
                }
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              getPartyList = response;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
            return getPartyList;
        };
        this.getLocationList = function() {
          var getLocationList = [];
          $http({
            method: 'GET',
            url: '/Private/getLocationList',
            headers: {
              'Authorization': 'Bearer ' + $localStorage.token
                }
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              getLocationList = response;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
            return getLocationList;
        };
        this.getMediaList = function() {
          var getMediaList = [];
          $http({
            method: 'GET',
            url: '/Private/getMediaList',
            headers: {
              'Authorization': 'Bearer ' + $localStorage.token
                }
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              getMediaList = response;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
            return getMediaList;
        };
        this.getLabelList = function() {
          var getLabelList = [];
          $http({
            method: 'GET',
            url: '/Private/getLabelList',
            headers: {
              'Authorization': 'Bearer ' + $localStorage.token
                }
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              getLabelList = response;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
            return getLabelList;
        };
        this.getContributionList = function() {
          var getContributionList = [];
          $http({
            method: 'GET',
            url: '/Private/getContributionList',
            headers: {
              'Authorization': 'Bearer ' + $localStorage.token
                }
          }).then(function successCallback(response) {
              // this callback will be called asynchronously
              // when the response is available
              getContributionList = response;
            }, function errorCallback(response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
            return getContributionList;
        };
    }]);
