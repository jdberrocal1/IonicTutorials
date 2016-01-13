/**
 * Created by jberrocal-as on 13/01/2016.
 */

(function () {
  var controllerId = 'appController';
  angular.module('app').controller(controllerId, [
    '$scope',
    '$state',
    '$ionicPopup',
    'LoginService',
    'AUTH_EVENTS',
    function (
      $scope,
      $state,
      $ionicPopup,
      LoginService,
      AUTH_EVENTS)
    {
      $scope.username = LoginService.username();

      $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
        var alertPopup = $ionicPopup.alert({
          title: 'Unauthorized!',
          template: 'You are not allowed to access this resource.'
        });
      });

      $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
        LoginService.logout();
        $state.go('login');
        var alertPopup = $ionicPopup.alert({
          title: 'Session Lost!',
          template: 'Sorry, You have to login again.'
        });
      });

      $scope.setCurrentUsername = function(name) {
        $scope.username = name;
      };
    }
  ])
})();
