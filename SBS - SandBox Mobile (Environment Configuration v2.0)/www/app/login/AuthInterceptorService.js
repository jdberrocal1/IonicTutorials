/**
 * Created by jberrocal-as on 13/01/2016.
 */
(function () {
  var serviceId = 'AuthInterceptor';
  angular.module('app').factory(serviceId, [
    '$q',
    '$rootScope',
    'AUTH_EVENTS',
    function (
      $q,
      $rootScope,
      AUTH_EVENTS
    ){
      var responseError = function responseError(response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);
        return $q.reject(response);
      }

      return {
        responseError: responseError
      }
    }
  ])
})();

