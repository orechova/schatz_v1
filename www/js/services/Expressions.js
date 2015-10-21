(function(){

/** Expressions model **/
  if (!pc_test)
  app.factory('Expressions', ["SchatzDB", function(SchatzDB){

    var self = this;
    
    self.getExpressions = function(languageF, languageT, orderBy) {
      var parameters = [languageF, languageT, (orderBy==1)?'languageF':'languageT'];
      return SchatzDB.query("SELECT * FROM expressions WHERE languageF=? AND languageT=? ORDER BY ?", parameters)
        .then(function(result){
          return SchatzDB.getAll(result);
        });
    }

    self.addNew = function(newExp) {
      var parameters = [newExp.languageF, newExp.languageT, newExp.textF, newExp.textT];
      return SchatzDB.query("INSERT INTO expressions (languageF, languageT, textF, textT) VALUES (?,?,?,?)", parameters);
    }

    return self;

  }]);

})();
