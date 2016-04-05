(function(){

  app.controller('VocabularyCtrl', ['$scope', '$rootScope', 'Languages', 'Expressions', function($scope, $rootScope, Languages, Expressions){

    $scope.search = {};
    $scope.showSearch = false;
    $scope.defaultFirst = true;

    Languages.getLanguages().then(function(lngs){
      $rootScope.languages = lngs;
      Languages.getSettings().then(function(set){
        $rootScope.settings = set[0];
        Expressions.getExpressions($rootScope.settings.default_language, $rootScope.settings.learning_language).then(function(exps){
          $rootScope.expressions = exps;
        });
      });
    });

    $scope.switchLanguages = function(){
      $scope.defaultFirst = !$scope.defaultFirst;
      if ($scope.defaultFirst) 
        $scope.search.textT = '';
      else
        $scope.search.textF = '';
    }

    $scope.toggleSearch = function(){
      $scope.showSearch = !$scope.showSearch;
    }
  }]);


app.directive('focusOn',function($timeout) {
    return {
        restrict : 'A',
        link : function($scope,$element,$attr) {
            $scope.$watch($attr.focusOn,function(_focusVal) {
                $timeout(function() {
                    //_focusVal ? $element.focus() : $element.blur();
                    // TODO ?
                });
            });
        }
    }
});

app.filter('orderByUnicode',function(){
  return function(array, parameter) {
      if (array && array.length > 0){
        array.sort(function(a, b){
          return a[parameter].localeCompare(b[parameter]);
        });
        return array;
      } else {
        return [];
      }
    }
});

})();