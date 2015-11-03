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
      $scope.testWord = $scope.testExpressions[index];
      $scope.showResult = false;
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
        Expressions.getTestExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(testExp){
          $scope.testExpressions = testExp;
          loadNextTest();
        });
      });
    });

    
  }]);

})();