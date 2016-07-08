(function() {
  'use strict';

  angular
  .module('shortCuts', [])
  .provider('$shortCuts', $shortCuts);

  function $shortCuts(){
    var provider = {
      $get : $get,
      shortCut : shortCut,
      showLog : showLog
    }
    , _keyCodes = {
      'ctrl' : 17,
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
    , _shortCuts = []
    , _showLog = false;
    return provider;

    function shortCut(keys, config) {
      _shortCuts.push(new ShortCut(keys, config));
      return this;
    };

    function showLog(option){
      _showLog = option;
    };

    function ShortCut(keys, config){
      var keys = buildKeys(keys);
      validateKeysAmount(keys);
      validateConfig(config);

      var shortCut = {
          keyOne : getKeyCode(keys[0])
        , keyTwo : getKeyCode(keys[1])
        , config : config
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

    function log(mgs){
      if (_showLog) {
        console.warn(mgs);
      };
    };

    function validateConfig(config){
      if (!config.actionType){
        throw new ActionTypeNotDefined();
      };
      if (config.actionType === 'EVENT' && !config.eventName){
        throw new EventNameNotDefined();
      };
      if (config.actionType === 'CALLBACK' && !angular.isFunction(config.callBack)){
        throw new CallBackNotDefined();
      };
    };

    function validateKeysAmount(keys){
      if (keys.length > 2)
        throw new InvalidKeysAmountException();
    };

    function InvalidKeysAmountException() {
      return Error('More than two keys defined.');
    };
  
    function KeyNotAvailable(key) {
      return Error('The key "' + key + '" is not available.');
    };

    function ActionTypeNotDefined(){
      return Error('Action type not defined in config.');
    };

    function EventNameNotDefined(){
      return Error('Event name not defined in config.');
    };

    function CallBackNotDefined(){
      return Error('CallBack not defined or not is a function.')
    };

    // the $get function retuns the service
    $get.$inject = ['$log', '$rootScope'];
    function $get($log, $rootScope){
      var service = {
        getShortCuts : getShortCuts
      }
      , fisrtKeyActive = false
      , firstKeyCode;
      document.onkeydown = onKeyDown; 

      return service;

      function onKeyDown(event){
        if (event.target.nodeName === 'BODY') {
          handle(event);
        };
      };

      function handle(event){
        if (isFirstKey(event.keyCode)) {
          fisrtKeyActive = true;
          firstKeyCode = event.keyCode;
        };
        
        if (fisrtKeyActive == true) {
          var shortCut = geShortCutByKeys(firstKeyCode, event.keyCode);
          if (shortCut) {
            executeConfigAction(shortCut.config);
            fisrtKeyActive = false;
          };
        };
      };

      function executeConfigAction(config){
        if (config.actionType === 'EVENT'){
          dispachEvent(config.eventName);
          return;
        };
        log('Running callBack {} ' + config.callBack);
        config.callBack();
      };

      function dispachEvent(eventName){
        log('Broadcasting event {} "' + eventName + '".')
        $rootScope.$broadcast(eventName);
      };

      function isFirstKey(key){
        var result = false;
        angular.forEach(_shortCuts, function(shortCut) {
          if (shortCut.keyOne === key)
            result = true;
        });
        return result;
      };

      function geShortCutByKeys(keyOne, keyTwo){
        var result;
        angular.forEach(_shortCuts, function(shortCut) {
          if (shortCut.keyOne === keyOne && shortCut.keyTwo === keyTwo)
            result = shortCut;
        });
        return result;
      };

      function getShortCuts(){
        return angular.copy(_shortCuts);
      };
      
    };
  };
})();