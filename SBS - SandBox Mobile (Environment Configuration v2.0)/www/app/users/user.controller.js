/**
 * Created by jberrocal-as on 22/12/2015.
 */
/**
 * Created by jberrocal-as on 22/12/2015.
 */

(function () {
  var controllerId = 'userController';
  angular.module('app').controller(controllerId, [
    '$scope',
    'UserService',
    '$ionicLoading',
    '$ionicPopup',
    '$location',
    '$stateParams',
    function (
      $scope,
      UserService,
      $ionicLoading,
      $ionicPopup,
      $location,
      $stateParams
    ){
      var vm = this;
      var id = $stateParams.id;
      vm.user={};

      vm.getUser=function getUser(){
        vm.user={};
        UserService.getUser(id)
          .then(function(response){
            vm.user=response.data;
            vm.user.username='('+vm.user.username+')';
          }, function(error) {

            $ionicPopup.alert({
              title:'Error',
              template: 'This user does not exist.'
            });
            $location.path('/app/users');
          })
          .finally(function() {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          });
      }

      //
      $ionicLoading.show();
      vm.getUser();


    }
  ])
})();
