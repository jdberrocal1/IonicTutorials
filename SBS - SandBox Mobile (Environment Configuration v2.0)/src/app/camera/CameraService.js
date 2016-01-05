/**
 * Created by jberrocal-as on 23/12/2015.
 */
/**
 * Created by jberrocal-as on 22/12/2015.
 */
(function () {
  var controllerId = 'CameraService';
  angular.module('app').service(controllerId, [
    '$cordovaImagePicker',
    function (
      $cordovaImagePicker
    ){
      //var vm = this;
      //vm.picture={};

      this.getPictureFromCamera= function getPictureFromCamera(success,error,options){
        return navigator.camera.getPicture(success,error,options);

      }


      //get image from gallery
      var options = {
        maximumImagesCount: 1,
        /*width: 800,
        height: 800,
        quality: 80*/
      };

      this.getPictureFromGallery = function getPictureFromGallery(){

        return $cordovaImagePicker.getPictures(options);
      }

    }
  ])
})();
