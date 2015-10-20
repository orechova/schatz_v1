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
        else console.log(item);
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
          console.log('******not found');
          $scope.languageAdded = true;
          Languages.getLanguages().then(function(lngs){
              $rootScope.languages = lngs;
          });
        } else {
          console.log('******found');
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

})();