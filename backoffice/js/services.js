var services = angular.module('civicBot', [ 'ngRoute','http', 'httpProvider' , 'ngStorage']);

services.factory('login',  function(formData) {
  $http({
  method: 'GET',
  url: '/Private/Login',
  data: formData
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $localStorage.token = response.token;
    window.location = "/admin";
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
});

services.factory('logout',  function() {
  $http({
    method: 'GET',
    url: '/Private/logout',
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $localStorage.token = response;
      window.location = "/";
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
});

//SET

services.factory('setParty',  function(data) {
  $http({
    method: 'POST',
    url: '/Private/setParty',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  });
});

services.factory('setMedia',  function(data) {
  $http({
    method: 'POST',
    url: '/Private/setMedia',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  });
});

services.factory('setLocation',  function(data) {
  $http({
    method: 'POST',
    url: '/Private/setLocation',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  });
});

services.factory('setLabel',  function(data) {
  $http({
    method: 'POST',
    url: '/Private/setLabel',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  });
});

services.factory('setToPublish',  function(data) {
  $http({
    method: 'POST',
    url: '/Private/setToPublish',
    data: data,
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  });
});

//GET

services.factory('getData',  function(){
  var getData = [];
  $http({
    method: 'GET',
    url: 'http://jsonplaceholder.typicode.com/photos',
    headers: {
      'Authorization': 'Bearer ' + $localStorage.token
        }
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      getData = response;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
    return getData;
});

services.factory('getPartyList',  function() {
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
});

services.factory('getLocationList',  function() {
  var getLocationList  = [];
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
});

services.factory('getMediaList',  function(data) {
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
});

services.factory('getLabelList',  function() {
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
});


services.factory('getContributionList',  function(data) {
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
});
