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

    self.getTestExpressions = function(languageF, languageT){
      var timeLimit = Math.floor(new Date().valueOf() / 1000) - 5*60;
      var parameters = [languageF, languageT, timeLimit];
      return SchatzDB.query("SELECT * FROM expressions " + 
                            "WHERE languageF=? AND languageT=? AND last_test_time<DATETIME(?) " +
                            "ORDER BY tests_passed, last_test_success, last_test_time, created", parameters)
        .then(function(result){
          return SchatzDB.getAll(result);
        });
    }

    self.setTestResult = function(expID, result, time){
      var timestamp = Math.floor( time.valueOf() / 1000 );
      switch(result){
        case 1:
          var parameters = [1, timestamp, expID];
          return SchatzDB.query("UPDATE expressions " +
                                "SET last_test_success=?, last_test_time=DATETIME(?), tests_passed=tests_passed+1 " +
                                "WHERE expression_id=?", parameters);
        break;
        case 0:
          var parameters = [0, timestamp, expID];
          return SchatzDB.query("UPDATE expressions " +
                                "SET last_test_success=?, last_test_time=DATETIME(?) " +
                                "WHERE expression_id=?", parameters);
        break;
        case -1:
          var parameters = [0, timestamp, expID];
          return SchatzDB.query("UPDATE expressions " +
                                "SET last_test_success=?, last_test_time=DATETIME(?), tests_passed=0 " +
                                "WHERE expression_id=?", parameters);
        break;
        default: 
          console.warn('invalid test result');
          console.warn(result);
          return false;
      }
    }

    return self;

  }]);

})();
