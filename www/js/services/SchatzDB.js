(function(){

  /** Service for handling DB **/
  if (!pc_test)
  app.factory("SchatzDB", function($cordovaSQLite, $q, $ionicPlatform){
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
            console.warn('I found an error');
            console.warn(error);
            console.log(JSON.stringify(error));
            console.log(query);
            console.log(parameters);
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

    self.initLanguages = function(){
    	self.query("SELECT COUNT(*) as count FROM languages")
        .then(function(res){
          if (res.rows.item(0).count == 0){
            var ins_query = "INSERT INTO languages (shortcut, name) VALUES (?,?)";
            self.query( ins_query, ['sk','slovenčina'] );
            self.query( ins_query, ['it','italiano'] );
          }
        });
      self.query("SELECT COUNT(*) as count FROM settings")
        .then(function(res){
          if (res.rows.item(0).count == 0){
            var ins_query = "INSERT INTO settings (default_language, learning_language) VALUES (?,?)";
            self.query( ins_query, [1, 2] );
          }
      	});
    };
       

    return self;
  });

})();
