var db=null;
angular.module('App', ['ionic','ngCordova'])

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/tabs/todo');
})

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    db = $cordovaSQLite.openDB("my.db");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS task (id integer primary key, task text)");
    });

  });

