(function(){

  app.controller('NewWordCtrl', ['$scope', '$rootScope', 'Languages', 'Expressions', function($scope, $rootScope, Languages, Expressions){

    $scope.formError = {};
    $scope.wordAdded = false;
    $scope.wordAddError = null;
    $scope.newWord = {};

    var findLanguageShortcut = function(findID){
      var item = null;
      for (var i=0; i<$rootScope.languages.length; i++){
        item = $rootScope.languages[i];
        if (item.language_id == findID)
          return item.shortcut;
      };
      return 'not found';
    }

    Languages.getLanguages().then(function(lngs){
      $rootScope.languages = lngs;
      Languages.getSettings().then(function(set){
        $rootScope.settings = set[0];
        $rootScope.settings.default_language_shortcut = findLanguageShortcut($rootScope.settings.default_language);
        $rootScope.settings.learning_language_shortcut = findLanguageShortcut($rootScope.settings.learning_language);
      });
    });

    $scope.addWord = function(newWord){
      
      $scope.formError = {};
      $scope.languageAdded = false;
      $scope.languageAddError = null;

      if ((typeof newWord.textF === 'undefined') || (newWord.textF.length==0)){
        $scope.formError.textF = 'required';
      } else if ((typeof newWord.textT === 'undefined') || (newWord.textT.length==0)){
        $scope.formError.textT = 'required';
      } else {
        newWord.languageF = $rootScope.settings.default_language;
        newWord.languageT = $rootScope.settings.learning_language;
        if (Expressions.addNew(newWord)){
          $scope.wordAdded = true;
          Expressions.getExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(exps){
            $rootScope.expressions = exps;
          });
        }    
      } 

    }

    $scope.clearForm = function(){
      $scope.newWord = {};
      $scope.wordAdded = false;
    }

  }]);

})();