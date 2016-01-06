/**
 * Created by jberrocal-as on 22/12/2015.
 */
(function () {
  var controllerId = 'menuController';
  angular.module('app').controller(controllerId, [
    '$ionicModal',
    '$timeout',
    '$scope',
    function (
      $ionicModal,
      $timeout,
      $scope){

      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('app/menu/InfoModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeModal = function() {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.info = function() {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function() {
        //console.log('Doing login', $scope.loginData);
        //
        //// Simulate a login delay. Remove this and replace with your login
        //// code if using a login system
        //$timeout(function() {
        //  $scope.closeLogin();
        //}, 1000);

      };

      /*--------------------------------------------------------------------------TESTING--------------------------------------------------------------------------*/
      /*Get the platform information*/
      $scope.platform= {
        //deviceInformation: ionic.Platform.device(),
        isWebView: ionic.Platform.isWebView(),
        isIPad: ionic.Platform.isIPad(),
        isIOS: ionic.Platform.isIOS(),
        isAndroid: ionic.Platform.isAndroid(),
        isWindowsPhone: ionic.Platform.isWindowsPhone(),
        currentPlatform: ionic.Platform.platform(),
        currentPlatformVersion: ionic.Platform.version()
      }

    }
  ])
})();
