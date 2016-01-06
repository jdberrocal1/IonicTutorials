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
    'DBService',
    '$ionicModal',
    'CameraService',
    function (
      $scope,
      UserService,
      $ionicLoading,
      $ionicPopup,
      $location,
      $stateParams,
      DBService,
      $ionicModal,
      CameraService
    ){
      var vm = this;
      var id = $stateParams.id;
      vm.user={};
      vm.photo='img/ionic.png';
      vm.havePhotoSaved=false;

      // Create the modal that we will use later
      $ionicModal.fromTemplateUrl('app/users/CameraOrGalleryModal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modalPhoto = modal;
      });

      // Triggered in the login modal to close it
      vm.closeModal = function() {
        $scope.modalPhoto.hide();
      };

      // Open the login modal
      vm.openGetPhotoModal = function openGetPhotoModal() {
        $scope.modalPhoto.show();
      };

      vm.getPictureFromCamera=function getPictureFromCamera(){
        CameraService.getPictureFromCamera(
          function(imageURI) {
            console.log(imageURI);
            vm.photo=imageURI;
            if(vm.havePhotoSaved){
              DBService.UpdatePhotoForUser(id, vm.photo);
            }else {
              DBService.SavePhotoForUser(id, vm.photo);
              vm.havePhotoSaved=true;
            }
            vm.closeModal();

          }, function(err) {
            vm.closeModal();
          },
          {
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
          }
        );

      }

      vm.getPictureFromGallery=function getPictureFromGallery(){
        CameraService.getPictureFromGallery()
          .then(function (results) {
            vm.photo=results[0];
            if(vm.havePhotoSaved){
              DBService.UpdatePhotoForUser(id, vm.photo);
            }else {
              DBService.SavePhotoForUser(id, vm.photo);
              vm.havePhotoSaved=true;
            }
            vm.closeModal();
          }, function(error) {
            console.error('ERROR');
            vm.closeModal();
          });
      }

      vm.getUser=function getUser(){
        vm.user={};
        UserService.getUser(id)
          .then(function(response){
            vm.user=response.data;
            vm.user.username='('+vm.user.username+')';
            DBService.GetPhotoForUser(id).then(function(res) {
              if(res.rows.length > 0) {
                vm.photo=res.rows.item(0).photo;
                vm.havePhotoSaved=true;
              } else {
                console.log("No results found");
                vm.photo='img/ionic.png';
                vm.havePhotoSaved=false;
              }
            }, function (err) {
              console.error(err);
            });;

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

      vm.cleanDB = function cleanDB(){
        DBService.cleanDB()
      }




      //vm.cleanDB();
      $ionicLoading.show();
      vm.getUser();


    }
  ])
})();
