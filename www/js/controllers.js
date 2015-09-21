app.controller('HomeTabCtrl', function(){
	
});

app.controller('SettingsTabCtrl', ['$scope','languages', function($scope, $languages){
	$scope.languages = $languages.all();
}]);

app.controller('InfoTabCtrl', function(){

});

