/**
 * Created by jberrocal-as on 22/12/2015.
 */

(function () {
  var controllerId = 'userListController';
  angular.module('app').controller(controllerId, [
    '$scope',
    'UserService',
    '$ionicLoading',
    '$ionicPopup',
    '$location',
    function (
      $scope,
      UserService,
      $ionicLoading,
      $ionicPopup,
      $location
    ){
      var vm = this;
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});
      vm.users=[];

      vm.getUsers=function getUsers(){
        vm.users=[];
        UserService.getUsers()
          .then(function(response){
            vm.users=response.data;
          }, function(error) {
              $ionicPopup.alert({
                template: 'Could not load users right now. Please try again later.'
              });
          })
          .finally(function() {
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
          });
      }

      vm.goToUser=function goToUser(user){
        $location.path('app/users/user/'+user.id);
      }

      //
      $ionicLoading.show();
      vm.getUsers();


    }
  ])
})();
