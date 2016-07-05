(function() {
  'use strict';

  angular
  .module('shortCuts', [])
  .provider('$shortCuts', $shortCuts);

  function $shortCuts(){
    var provider = {
      $get : $get,
      shortCut : shortCut
    }
    , _shortCuts = [];
    return provider;

    function shortCut(keys, config) {
      _shortCuts.push(new ShortCut(keys, config));
      return this;
    };

    function ShortCut(keys, config){
      var keys = buildKeys(keys);
      validateKeys(keys);

      var shortCut = {
          keyOne : keys[0]
        , keyTwo : keys[1]
      };

      return shortCut;
    };

    function buildKeys(keys){
      return keys.split('+');
    };

    function validateKeys(keys){
      if (keys.length > 2)
        throw new InvalidKeysException();
    };

    function InvalidKeysException() {
      return Error('More than two keys defined.');
    };

    // the $get function retuns the service
    $get.$inject = ['$log', '$rootScope', '$document'];
    function $get($log, $rootScope, $document){
      var service = {
        log : log
      };

      $document[0].onkeydown = onKeyDown; 

      function onKeyDown(event){
        if (event.target.nodeName === 'BODY')
          handle(event);
      };

      function handle(event){
        console.log('event {}', event);
      };

      // for test
      function log(){
        $log.info('wow', _shortCuts);
      };
      
      return service;
    };
  };
})();