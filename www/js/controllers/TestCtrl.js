(function(){

  app.controller('TestCtrl', ['$scope', '$rootScope', 'Languages', 'Expressions', function($scope, $rootScope, Languages, Expressions){

    $scope.testExpressions = [];
    $scope.testWord = null;
    $scope.showResult = false;

    $scope.testResult = function(testWord, result){
      var now = new Date();
      Expressions.setTestResult(testWord.expression_id, result, now).then(function(){
        Expressions.getTestExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(testExp){
          $scope.testExpressions = testExp;
          loadNextTest();
        });
      });
    }

    $scope.translate = function(){
      $scope.showResult = true;
    }

    var loadNextTest = function(){
      var index = nonUniformRandom($scope.testExpressions.length);
      console.log('****** EXPRESIONS ******');
      console.log(JSON.stringify($scope.testExpressions));
      console.log('****** INDEX: '+index+' ******');
      $scope.testWord = $scope.testExpressions[index];
      $scope.showResult = false;
    }

    var findLanguageShortcut = function(findID){
      var item = null;
      for (var i=0; i<$rootScope.languages.length; i++){
        item = $rootScope.languages[i];
        if (item.language_id == findID)
          return item.shortcut;
      };
      return 'not found';
    }

    var nonUniformRandom = function(max){
      var unif = Math.random();
      var beta = Math.sin(unif*Math.PI/2)*Math.sin(unif*Math.PI/2);
      var beta_left = (beta < 0.5) ? 2*beta : 2*(1-beta);

      return Math.floor(beta_left * max);
    }

    Languages.getLanguages().then(function(lngs){
      $rootScope.languages = lngs;
      Languages.getSettings().then(function(set){
        $rootScope.settings = set[0];
        $rootScope.settings.default_language_shortcut = findLanguageShortcut($rootScope.settings.default_language);
        $rootScope.settings.learning_language_shortcut = findLanguageShortcut($rootScope.settings.learning_language);

        Expressions.getTestExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(testExp){
          $scope.testExpressions = testExp;
          loadNextTest();
        });
      });
    });

    
  }]);

})();