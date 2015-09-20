app.controller('HomeTabCtrl', function(){
	
});

app.controller('SettingsTabCtrl', ['$scope','languages', function($scope, $languages){
	$scope.languages = $languages.all();
}]);

app.controller('InfoTabCtrl', function(){

});

app.controller('DBCtrl', function($scope, $cordovaSQLite) {

  var db = $cordovaSQLite.openDB({ name: "my.db" });

  // for opening a background db:
  var db = $cordovaSQLite.openDB({ name: "my.db", bgType: 1 });

  $scope.execute = function() {
    var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
    $cordovaSQLite.execute(db, query, ["test", 100]).then(function(res) {
      console.log("insertId: " + res.insertId);
    }, function (err) {
      console.error(err);
    });
  };

});
