/**
 * Created by jberrocal-as on 22/12/2015.
 */

(function () {
  var serviceId = 'UserService';
  angular.module('app').service(serviceId, [
    '$http',
    function (
      $http
    ){
      this.getUsers=function getUsers(){
        return $http.get('http://jsonplaceholder.typicode.com/users');
      }

      this.getUser=function getUser(id){
        return $http.get('http://jsonplaceholder.typicode.com/users/'+ id);
      }

    }
  ])
})();
