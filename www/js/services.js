app.factory('languagesSettings', ["cordovaSQLite", function($cordovaSQLite){

	// open db connection

	if (!$localStorage.languagesSettings){
    $localStorage.languagesSettings = JSON.stringify({
    	'learning':[ {id: 'it', name: 'italiano'}, {id: 'de', name: 'deutsch'} ],
    	'default': {id: 'sk', name: 'slovenčina'},
    	'current': 'it'
    });
  }
	// load from localStorage
	var languagesSettings = JSON.parse( $localStorage.languagesSettings );

	// setters and getters
	function set_current(id){
		languagesSettings.current = id;
		$localStorage.languagesSettings = JSON.stringify(languagesSettings);
	}
	function add_language(id, name){
		languagesSettings.learning.push({ id, name });
		$localStorage.languagesSettings = JSON.stringify(languagesSettings);
	}
	function remove_language(id){
		for (key in languagesSettings.learning){
			if (languagesSettings.learning[key].id==id){
				languagesSettings.learning.splice(key, 1);
				$localStorage.languagesSettings = JSON.stringify(languagesSettings);
				return key;
			}
		}
	}

  return languagesSettings;

}]);