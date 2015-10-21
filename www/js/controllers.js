(function(){

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