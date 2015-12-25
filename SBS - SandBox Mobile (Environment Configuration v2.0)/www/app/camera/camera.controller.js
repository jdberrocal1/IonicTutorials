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
    '$cordovaImagePicker',
    function (
      $scope,
      $cordovaImagePicker
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


      //get image from gallery
      var options = {
        maximumImagesCount: 1,
        /*width: 800,
        height: 800,
        quality: 80*/
      };

      vm.getPictureFromGallery = function getPictureFromGallery(){
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            vm.picture.imgURI=results[0];
            //$scope.$apply();
            /*for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);

            }*/
          }, function(error) {
            console.error('ERROR');
          });
      }

    }
  ])
})();
