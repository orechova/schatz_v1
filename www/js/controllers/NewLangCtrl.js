(function(){

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

})();