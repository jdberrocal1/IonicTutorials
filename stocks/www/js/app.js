var db=null;
angular.module('App', ['ionic','ngCordova'])

.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/tabs/quotes');

})

.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {

    db = $cordovaSQLite.openDB("taskDB");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS task (id integer primary key, task text)");
        $cordovaSQLite.execute(db, "INSERT INTO task (task) VALUES ('Initial Testing Task')");

    });

  });

