(function() {
  'use strict';

  angular
  .module('AngularShortCuts', [])
  .provider('$angularShortCuts', $angularShortCuts);

  function $angularShortCuts(){
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