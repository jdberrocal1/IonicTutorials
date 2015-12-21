angular.module('App')

.service('DataService', function($cordovaSQLite) {

    this.addTask=function addTask(task){
        var query = "INSERT INTO task (task) VALUES (?)";
        $cordovaSQLite.execute(db, query, [task]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
            console.error(err);
        });
    }

    this.getTasks = function getTasks(){
        var result = [];
        var query = "SELECT * FROM task";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).task);
                result=res.rows;
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