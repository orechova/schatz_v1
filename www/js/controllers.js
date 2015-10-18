app.controller('HomeTabCtrl', function(){
	
});

app.controller('SettingsTabCtrl', ['$scope','Languages', function($scope, Languages){

	Languages.getLanguages().then(function(lngs){
      $scope.languages = lngs;
  });

  Languages.getSettings().then(function(set){
      $scope.settings = set[0];
  });

  $scope.setLearningLanguage = function(language_id){
  	Languages.setLearningLanguage(language_id);
  }

}]);

app.controller('InfoTabCtrl', function(){

});
