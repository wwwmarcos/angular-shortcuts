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
    , _keyCodes = {
      'a' : 65,
      'b' : 66,
      'c' : 67,
      'd' : 68,
      'e' : 69,
      'f' : 70,
      'g' : 71,
      'h' : 72,
      'i' : 73,
      'j' : 74,
      'k' : 75,
      'l' : 76,
      'm' : 77,
      'n' : 78,
      'o' : 79,
      'p' : 80,
      'q' : 81,
      'r' : 82,
      's' : 83,
      't' : 84,
      'u' : 85,
      'v' : 86,
      'w' : 87,
      'x' : 88,
      'y' : 89,
      'z' : 90,
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
          keyOne : getKeyCode(keys[0])
        , keyTwo : getKeyCode(keys[1])
      };

      return shortCut;
    };

    function getKeyCode(key){
      var keyCode = _keyCodes[key];
      if (!keyCode)
        throw new KeyNotAvailable(key);

      return _keyCodes[key]
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
  
    function KeyNotAvailable(key) {
      return Error('The key "' + key + '" is not available.');
    };

    // the $get function retuns the service
    $get.$inject = ['$log', '$rootScope'];
    function $get($log, $rootScope, $document){
      var service = {
        log : log
      }
      , fisrtKeyActive = false
      , firstKeyCode;

      document.onkeydown = onKeyDown; 

      function onKeyDown(event){
        if (event.target.nodeName === 'BODY')
          handle(event);
      };

      function handle(event){
        if (isFirstKey(event.keyCode)) {
          fisrtKeyActive = true;
          firstKeyCode = event.keyCode;
        };
        
        if (fisrtKeyActive == true) {

        };
      };

      function isFirstKey(key){
        var result = false;
        angular.forEach(_shortCuts, function(shortCut) {
          if (shortCut[keyType] === key)
            result = true;
        });
        return result;
      };

      // for test
      function log(){
        $log.info('wow', _shortCuts);
      };
      
      return service;
    };
  };
})();