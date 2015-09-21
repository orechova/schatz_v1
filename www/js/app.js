var app = angular.module('Schatz', ['ionic','ngCordova']);
var db = null;


/** INITIALIZE THE APP 
** create db and tables and insert some example data if not existing **/
app.run(function($ionicPlatform, $cordovaSQLite) {

  $ionicPlatform.ready(function() {
    
    db = window.sqlitePlugin.openDatabase( {name: "schatz.db", createFromLocation: 1} );

  });

});

/** APP CONFIGURATION
** prepare routing **/
app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

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

  $ionicConfigProvider.tabs.position('bottom');

});
