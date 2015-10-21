(function(){

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

})();