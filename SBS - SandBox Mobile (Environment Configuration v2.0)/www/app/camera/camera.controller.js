/**
 * Created by jberrocal-as on 23/12/2015.
 */
/**
 * Created by jberrocal-as on 22/12/2015.
 */
(function () {
  var controllerId = 'cameraController';
  angular.module('app').controller(controllerId, [
    '$scope',
    function (
      $scope
    ){
      var vm = this;
      vm.picture={};

      vm.takeAPicture= function takeAPicture(){
        navigator.camera.getPicture(function(imageURI) {
            console.log(imageURI);
            vm.picture.imgURI=imageURI;
            $scope.$apply();
          // imageURI is the URL of the image that we can use for
          // an <img> element or backgroundImage.


        }, function(err) {

          // Ruh-roh, something bad happened

        },{quality: 75,
          targetWidth: 320,
          targetHeight: 320,
          saveToPhotoAlbum: false});
      }
    }
  ])
})();
