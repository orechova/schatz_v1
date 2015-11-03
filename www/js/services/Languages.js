(function(){

  /** Languages model **/
  if (!pc_test)
  app.factory('Languages', ["SchatzDB", function(SchatzDB){

  	var self = this;

  	SchatzDB.initLanguages();
  	
  	self.getLanguages = function() {
  		return SchatzDB.query("SELECT * FROM languages")
        .then(function(result){
          return SchatzDB.getAll(result);
        });
    }

    self.getSettings = function(){
      return SchatzDB.query("SELECT settings.*, def.shortcut AS default_shortcut, def.name AS default_name, " + 
                            "learn.shortcut AS learning_shortcut, learn.name AS learning_name " +
                            "FROM settings " + 
                            "JOIN languages AS def ON settings.default_language=def.language_id " +
                            "JOIN languages AS learn ON settings.learning_language=learn.language_id " +
                            "WHERE settings.user_id=1")
        .then(function(result){
          return SchatzDB.getAll(result);
        });
    }

    self.setLearningLanguage = function(language_id){
      var parameters = [language_id];
      return SchatzDB.query("UPDATE settings SET learning_language=? WHERE user_id=1", parameters);
    }

    self.addNew = function(newLang) {
      var parameters = [newLang.shortcut, newLang.name];
      return SchatzDB.query("INSERT INTO languages (shortcut, name) VALUES (?,?)", parameters);
    }

    return self;

  }]);

})();
