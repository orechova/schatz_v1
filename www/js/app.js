var pc_test = false;
if (pc_test)
  var app = angular.module('Schatz', ['ionic']);
else
  var app = angular.module('Schatz', ['ionic','ngCordova']);
var db = null;


/** INITIALIZE THE APP 
** create db and tables and insert some example data if not existing **/

if (!pc_test)
app.run(function($ionicPlatform, $cordovaSQLite) {

  $ionicPlatform.ready(function() {
    
    db = $cordovaSQLite.openDB("schatz.db"); //device

    // CREATE TABLE LANGUAGES
    $cordovaSQLite.execute(db, 
      "CREATE TABLE IF NOT EXISTS languages(" +
      "language_id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "shortcut VARCHAR NOT NULL," +
      "name VARCHAR NOT NULL" +
      ")"
    );

    // CREATE TABLE SETTINGS
    $cordovaSQLite.execute(db,
      "CREATE TABLE IF NOT EXISTS settings(" +
      "user_id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "default_language INTEGER NOT NULL," +
      "learning_language INTEGER NOT NULL" +
      ")"
    );

    // CREATE TABLE EXPRESSIONS
    $cordovaSQLite.execute(db,
      "CREATE TABLE IF NOT EXISTS expressions(" +
      "expression_id INTEGER PRIMARY KEY AUTOINCREMENT," +
      "created DATETIME DEFAULT CURRENT_TIMESTAMP," +
      "last_test_time DATETIME DEFAULT CURRENT_TIMESTAMP," +
      "last_test_success INTEGER DEFAULT 0," +
      "languageD INTEGER NOT NULL," +
      "textD TEXT NOT NULL," +
      "languageL INTEGER NOT NULL," +
      "textL TEXT NOT NULL" +
      ")"
    );
    // THIS WILL START EMPTY

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
          controller: (pc_test)?'SettingsTabCtrlDemo':'SettingsTabCtrl'
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
