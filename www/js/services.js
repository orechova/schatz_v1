/** Service for handling DB **/
app.factory("schatzDB", ["cordovaSQLite", function($cordovaSQLite, $q){
  var self = this;

   

  // Handle query's and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
        	console.log('Errors found');
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
}]);

/** Languages model **/
app.factory('languages', ["cordovaSQLite", "schatzDB", function($cordovaSQLite, schatzDB){

	var self = this;
	
	// load from db
	self.all = function() {
		return schatzDB.query("SELECT language_id, shortcut, name FROM languages")
      .then(function(result){
        return schatzDB.getAll(result);
      });
  }

	// setters and getters
	self.add = function(shortcut, name) {
    var parameters = [shortcut, name];
    return schatzDB.query("INSERT INTO languages (shortcut, name) VALUES (?,?)", parameters);
  }
	self.remove = function(language_id) {
    var parameters = [language_id];
    return schatzDB.query("DELETE FROM languages WHERE id = (?)", parameters);
  }

  return languages;

}]);