var app = angular.module('Schatz', ['ionic','ngCordova']);
var db = null;


app.run(function($ionicPlatform, $cordovaSQLite) {

  $ionicPlatform.ready(function() {
    db = $cordovaSQLite.openDB("schatz01.db");
    // CREATE TABLE LANGUAGES
    $cordovaSQLite.execute(db, "
      CREATE TABLE IF NOT EXISTS languages(
      language_id INTEGER PRIMARY KEY AUTOINCREMENT,
      shortcut VARCHAR NOT NULL,
      name VARCHAR NOT NULL
      );
    ");
    // AND PREPOPULATE
    $cordovaSQLite.execute(db, "SELECT COUNT(*) FROM languages")
      .then(function(res){
        if (res.rows.length == 0){
          var ins_query = "INSERT INTO languages (firstname, lastname) VALUES (?,?)";
          $cordovaSQLite.execute(db, ins_query, ['sk','slovenčina']);
          $cordovaSQLite.execute(db, ins_query, ['it','italiano']);
        }
      });

    // CREATE TABLE SETTINGS
    $cordovaSQLite.execute(db, "
      CREATE TABLE IF NOT EXISTS settings(
      user_id INTEGER PRIMARY KEY,
      default_language INTEGER NOT NULL,
      learning_language INTEGER NOT NULL
      );
    ");
    // AND PREPOPULATE
    $cordovaSQLite.execute(db, "SELECT COUNT(*) FROM settings")
      .then(function(res){
        if (res.rows.length == 0){
          var ins_query = "INSERT INTO settings (user_id, default_language, learning_language) VALUES (?,?)";
          $cordovaSQLite.execute(db, ins_query, [1, 1, 2]);
        }
      });

    // TABLE EXPRESSIONS
    $cordovaSQLite.execute(db, "
      CREATE TABLE IF NOT EXISTS expressions(
      expression_id INTEGER PRIMARY KEY,
      created DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_test_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_test_success INTEGER DEFAULT 0,
      languageD INTEGER NOT NULL,
      textD TEXT NOT NULL,
      languageL INTEGER NOT NULL,
      textL TEXT NOT NULL
      );
    ");
    // THIS WILL START EMPTY

  });

});



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
