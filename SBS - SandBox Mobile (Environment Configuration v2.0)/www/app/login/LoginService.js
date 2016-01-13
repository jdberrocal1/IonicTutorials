/**
 * Created by jberrocal-as on 13/01/2016.
 */
(function () {
  var serviceId = 'LoginService';
  angular.module('app').service(serviceId, [
    '$http',
    'USER_ROLES',
    '$q',
    function (
      $http,
      USER_ROLES,
      $q
    ){
      var LOCAL_TOKEN_KEY = 'Your_Access_Token';
      var username = '';
      var isAuthenticated = false;
      var role = '';
      var authToken;

      function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
          useCredentials(token);
        }
      }

      function storeUserCredentials(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
      }

      function useCredentials(token) {
        username = token.split('.')[0];
        isAuthenticated = true;
        authToken = token;

        if (username == 'admin') {
          role = USER_ROLES.admin
        }
        if (username == 'user') {
          role = USER_ROLES.public
        }

        // Set the token as header for your requests!
        $http.defaults.headers.common['X-Auth-Token'] = token;
      }

      function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
      }

      var login = function login(name, pw) {
        return $q(function(resolve, reject) {
          if ((name == 'admin' && pw == '123') || (name == 'user' && pw == '123')) {
            // Make a request and receive your auth token from your server
            storeUserCredentials(name + '.yourServerToken');
            resolve('Login success.');
          } else {
            reject('Login Failed.');
          }
        });
      };

      var logout = function logout() {
        destroyUserCredentials();
      };

      var isAuthorized = function isAuthorized(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
      };

      loadUserCredentials();

      return {
        login: login,
        logout: logout,
        isAuthorized: isAuthorized,
        isAuthenticated: function() {return isAuthenticated;},
        username: function() {return username;},
        role: function() {return role;}
      };

    }
  ])
})();
