/**
 * Created by jberrocal-as on 05/01/2016.
 */
(function () {
  var serviceId = 'DBService';
  angular.module('app').service(serviceId, [
    '$cordovaSQLite',
    function (
      $cordovaSQLite
    ){

      this.cleanDB= function cleanDB(){
        var query = "DELETE FROM user";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
        }, function (err) {
          console.error(err);
        });
      }

      this.SavePhotoForUser = function SavePhotoForUser(idUser, photo) {
        var query = "INSERT INTO user (idUser, photo) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [idUser, photo]).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
      }

      this.UpdatePhotoForUser = function UpdatePhotoForUser(idUser, photo) {
        var query = 'UPDATE user SET photo="'+photo+'" WHERE idUser ='+idUser+';';
        $cordovaSQLite.execute(db, query).then(function(res) {
          console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
          console.error(err);
        });
      }

      this.GetPhotoForUser = function GetPhotoForUser(idUser) {
        var query = "SELECT * FROM user WHERE idUser = ?";
        return $cordovaSQLite.execute(db, query, [idUser]);
      }

    }
  ])
})();
