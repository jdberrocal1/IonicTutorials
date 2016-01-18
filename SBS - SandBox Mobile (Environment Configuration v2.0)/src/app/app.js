var db = null;
(function() {
  'use strict';
  angular.module('app', ['ionic','ngCordova'])

    .run(function($ionicPlatform,$cordovaSQLite,$ionicPopup) {
      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
          // for form inputs)
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

          // Don't remove this line unless you know what you are doing. It stops the viewport
          // from snapping when text inputs are focused. Ionic handles this internally for
          // a much nicer keyboard experience.
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }

        //// Check for network connection
        //if(window.Connection) {
        //  if(navigator.connection.type == Connection.NONE) {
        //    $ionicPopup.confirm({
        //        title: 'No Internet Connection',
        //        content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        //      })
        //      .then(function(result) {
        //        if(!result) {
        //          ionic.Platform.exitApp();
        //        }
        //      });
        //  }
        //}

        //SQLITE DATABASE
        db = $cordovaSQLite.openDB("db");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS user (id integer primary key, idUser integer, photo text)");

        //PUSH NOTIFICATION USING PARSE SERVICES
        var appId='ZEhJJwrifNedqjaHRzOCC7q1SJIBwCPkDE1F1iNE';
        var clientKey='3AMGHs2hsU1WQW8m33vbVTKK2UJYWBPpT8aAG22W';
        parsePlugin.initialize(appId, clientKey, function() {
          parsePlugin.subscribe('SampleChannel', function() {
            parsePlugin.getInstallationId(function(id) {
              var install_data = {
                installation_id: id,
                channels: ['SampleChannel']
              }
            }, function(e) {
              alert('error');
            });
          }, function(e) {
            alert('error');
          });
        }, function(e) {
          alert('error');
        });
      });
    })

    .config([
      '$stateProvider',
      '$urlRouterProvider',
      'USER_ROLES',
      function($stateProvider, $urlRouterProvider,USER_ROLES){
        $stateProvider
          .state('login', {
            url: '/login',
            //abstract: true,
            templateUrl: 'app/login/login.html',
            controller: 'loginController',
            controllerAs:'login'
          })
          .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'menuController',
            controllerAs:'menu'
          })
          .state('app.flash', {
            url: '/flash',
            views: {
              'menuContent': {
                templateUrl: 'app/flash/flash.html',
                controller: 'flashController',
                controllerAs:'flash'
              }
            }
          })
          .state('app.users', {
            url: '/users',
            views: {
              'menuContent': {
                templateUrl: 'app/users/userList.html',
                controller: 'userListController',
                controllerAs:'userList'
              }
            }
          })
          .state('app.user', {
            url: "/users/user/:id",
            views: {
              'menuContent': {
                templateUrl: 'app/users/user.html',
                controller: 'userController',
                controllerAs: 'user'
              }
            },
            data: {
              authorizedRoles: [USER_ROLES.admin]
            }
          });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/users');
      }
    ])

    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    })

    .run(function ($rootScope, $state, LoginService, AUTH_EVENTS) {
      $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

        if ('data' in next && 'authorizedRoles' in next.data) {
          var authorizedRoles = next.data.authorizedRoles;
          if (!LoginService.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            $state.go($state.current, {}, {reload: true});
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }
        }

        if (!LoginService.isAuthenticated()) {
          if (next.name !== 'login') {
            event.preventDefault();
            $state.go('login');
          }
        }
      });
  });
})();



