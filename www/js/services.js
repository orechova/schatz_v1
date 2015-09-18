app.factory('languages', function languagesFactory(){
  return {
    'learning':[
      {id: 'it', name: 'italiano'}, {id: 'de', name: 'deutsch'}
    ],
    'default': {id: 'sk', name: 'slovenčina'},
    'current': 'it'
  };
});