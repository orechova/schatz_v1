var app = angular.module('Schatz', ['ionic','ngCordova']);

app.run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            db = $cordovaSQLite.openDB("schatz01.db");
            // TABLE LANGUAGES
            $cordovaSQLite.execute(db, "
              CREATE TABLE IF NOT EXISTS `languages` (
              `language_id` int(11) NOT NULL,
              `shortcut` char(2) NOT NULL,
              `name` varchar(30) NOT NULL
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
            ");
            $cordovaSQLite.execute(db, " ALTER TABLE `languages` ADD PRIMARY KEY (`language_id`); ");
            $cordovaSQLite.execute(db, " ALTER TABLE `languages` MODIFY `language_id` int(11) NOT NULL AUTO_INCREMENT; ");
            // TABLE SETTINGS
            $cordovaSQLite.execute(db, "
              
            ");
            $cordovaSQLite.execute(db, "
              
            ");
            // TABLE EXPRESSIONS
            $cordovaSQLite.execute(db, "
              
            ");
            $cordovaSQLite.execute(db, "
              
            ");
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
/*


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
