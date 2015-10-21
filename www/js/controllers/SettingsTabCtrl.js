(function(){

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

})();