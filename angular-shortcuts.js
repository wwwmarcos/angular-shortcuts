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

    function $get(){
      return _shortCuts;
    };

    function shortCut(shortCut) {
      _shortCuts.push(shortCut);
      return this;
    };
  };
})();