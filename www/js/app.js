var app = angular.module('Schatz', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.settings', {
      url: "/settings",
      views: {
        'settings-tab': {
          templateUrl: "templates/settings.html",
          controller: 'SettingsTabCtrl'
        }
      }
    })
    .state('tabs.info', {
      url: "/info",
      views: {
        'info-tab': {
          templateUrl: "templates/info.html",
          controller: 'InfoTabCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise("/tab/home");

});

app.controller('mainController', function($scope){

});
/*
app.factory('languages', function languagesFactory(){
  return {
    'list':[
      {id: 'sk', name: 'slovenčina'}, {id: 'it', name: 'italiano'}, {id: 'de', name: 'deutsch'}
    ],
    'default': 'sk',
    'translate': 'it'
  };
});

app.factory('localStorageWords',["ngStorage", function($localStorage){

  if (!$localStorage.words){
        $localStorage.words = JSON.stringify([]);
      }
  if (!$localStorage.lastID){
    $localStorage.lastID = -1;
  }

  return {
    update: function(words){
      $localStorage.words = JSON.stringify(words);
    },
    get: function(){
      return JSON.parse( $localStorage.words );
    }
  }
}]);
*/
