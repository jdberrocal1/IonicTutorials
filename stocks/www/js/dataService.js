angular.module('App')

.service('DataService', function($cordovaSQLite) {

    this.cleanDB= function cleanDB(){
      var query = "DELETE FROM task";
      $cordovaSQLite.execute(db, query, []).then(function(res) {
      }, function (err) {
        console.error(err);
      });
    }

    this.addTask=function addTask(task){
        var query = "INSERT INTO task (task) VALUES (?)";
        $cordovaSQLite.execute(db, query, [task]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }

    this.getTasks = function getTasks(){
      //console.log('-------------Select From DB--------------');
        var result = [];
        var query = "SELECT * FROM task";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
              for(var i =0;i<res.rows.length;i++){
                console.log("SELECTED "+i+"-> " + res.rows.item(i).task);
                result.push(res.rows.item(i).task);
              }
                return result;
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
        return result;
    }
});
