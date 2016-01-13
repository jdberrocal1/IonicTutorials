/**
 * Created by jberrocal-as on 13/01/2016.
 */
  (function () {
    angular.module('app')
      .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
      })
  })();
