/**
 * Created by jberrocal-as on 18/01/2016.
 */

(function () {
  var controllerId = 'flashController';
  angular.module('app').controller(controllerId, [
    '$rootScope',
    '$cordovaFlashlight',
    '$cordovaBatteryStatus',
    '$scope',
    '$ionicPlatform',
    function (
      $rootScope,
      $cordovaFlashlight,
      $cordovaBatteryStatus,
      $scope,
      $ionicPlatform
    ){
      var vm = this;
      vm.isOn=false;
      vm.isOnMsg='On';
      vm.batteryLevel='';

      $cordovaFlashlight.available().then(function(availability) {
        vm.avail = availability;
      }, function () {

      });

      vm.switchOn =function switchOn(){
        if(vm.avail){
          $cordovaFlashlight.switchOn()
            .then(
              function (success) { /* success */ },
              function (error) { /* error */ });
        }
      }

      vm.switchOff =function switchOff(){
        if(vm.avail){
          $cordovaFlashlight.switchOff()
            .then(
              function (success) { /* success */ },
              function (error) { /* error */ });
        }
      }

      vm.toggle = function toggle(){
        vm.isOn=!vm.isOn;
        vm.isOnMsg= vm.isOn ? 'Off' : 'On';
        $cordovaFlashlight.toggle()
          .then(function (success) {
            /* success */ },
            function (error) {
              /* error */ }
        );
      }


      $ionicPlatform.ready(function(){
        $rootScope.$on('$cordovaBatteryStatus:status', function (event,args){
          vm.batteryLevel = args.level;
        });
      });
    }
  ])
})();
