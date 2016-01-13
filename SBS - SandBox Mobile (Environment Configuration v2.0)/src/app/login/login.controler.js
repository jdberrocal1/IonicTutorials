/**
 * Created by jberrocal-as on 13/01/2016.
 */

(function () {
  var controllerId = 'loginController';
  angular.module('app').controller(controllerId, [
    '$scope',
    '$state',
    '$ionicPopup',
    'LoginService',
    function (
      $scope,
      $state,
      $ionicPopup,
      LoginService)
    {
      var vm = this;

      vm.data = {};

      vm.login = function login(data) {
        LoginService.login(data.username, data.password).then(function(authenticated) {
          $state.go('app.users', {}, {reload: true});
          $scope.setCurrentUsername(data.username);
          vm.data={};
        }, function(err) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
      };





    }
  ])
})();
