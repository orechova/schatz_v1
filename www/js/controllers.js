(function(){

  app.controller('HomeTabCtrl', function(){
  	
  });

  app.controller('SettingsTabCtrl', ['$scope','$rootScope','Languages', function($scope, $rootScope, Languages){

  	Languages.getLanguages().then(function(lngs){
      $rootScope.languages = lngs;
    });

    Languages.getSettings().then(function(set){
      $rootScope.settings = set[0];
    });

    $scope.setLearningLanguage = function(language_id){
    	Languages.setLearningLanguage(language_id).then(function(){
        $rootScope.settings.learning_language = language_id;
      });
    }

  }]);

  app.controller('InfoTabCtrl', function(){

  });

  app.controller('NewLangCtrl', ['$scope','$state','$rootScope','Languages', function($scope, $state, $rootScope,  Languages){

    $scope.formError = {};
    $scope.languageAdded = false;
    $scope.languageAddError = null;
    

    var findLanguage = function(find){
      var item = null;
      for (var i=0; i<$rootScope.languages.length; i++){
        item = $rootScope.languages[i];
        if ((item.shortcut == find.shortcut) || (item.name == find.name))
          return true;
      };
      return false;
    }

    $scope.addLanguage = function(newLang){
      
      $scope.formError = {};
      $scope.languageAdded = false;
      $scope.languageAddError = null;

      if ((typeof newLang.name === 'undefined') || (newLang.name.length==0)){
        $scope.formError.name = 'required';
      } else if ((typeof newLang.shortcut === 'undefined') || (newLang.shortcut.length==0)){
        $scope.formError.shortcut = 'required';
      } else {
        if (!findLanguage(newLang) && Languages.addNew(newLang)){
          Languages.getLanguages().then(function(lngs){
            $scope.languageAdded = true;
            $rootScope.languages = lngs;
          });
        } else {
          $scope.languageAddError = 'Language already exists';
        }
      } 

    }

  }]);

  app.controller('SettingsTabCtrlDemo', ['$scope', function($scope){

    $scope.languages = [
      { 'language_id': 1, 'name': 'slovencina', 'shortcut': 'sk' },
      { 'language_id': 2, 'name': 'italiano', 'shortcut': 'it' },
      { 'language_id': 3, 'name': 'deutsch', 'shortcut': 'de' },
    ];

    $scope.settings = { 'learning_language': 2, 'default_language': 1 };

    $scope.setLearningLanguage = function(language_id){
      $scope.settings.learning_language = language_id;
    }

  }]);


  app.controller('VocabularyCtrl', ['$scope', '$rootScope', 'Languages', 'Expressions', function($scope, $rootScope, Languages, Expressions){

    var findLanguageName = function(findID){
      var item = null;
      for (var i=0; i<$rootScope.languages.length; i++){
        item = $rootScope.languages[i];
        if (item.language_id == findID)
          return item.name;
      };
      return 'not found';
    }

    Languages.getLanguages().then(function(lngs){
      $rootScope.languages = lngs;
      Languages.getSettings().then(function(set){
        $rootScope.settings = set[0];
        $rootScope.settings.default_language_name = findLanguageName($rootScope.settings.default_language);
        $rootScope.settings.learning_language_name = findLanguageName($rootScope.settings.learning_language);
        Expressions.getExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(exps){
          $rootScope.expressions = exps;
        });
      });
    });

  }]);


  app.controller('NewWordCtrl', ['$scope', '$rootScope', 'Languages', 'Expressions', function($scope, $rootScope, Languages, Expressions){

    $scope.formError = {};
    $scope.wordAdded = false;
    $scope.wordAddError = null;

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
        console.log('******inserting');  
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

  }]);

})();