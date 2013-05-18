var Loader;

Loader = (function() {

  function Loader() {}

  Loader.files = {};

  Loader.load = function(path) {
    var _base;
    return (_base = this.files)[path] || (_base[path] = $.ajax({
      url: path,
      async: false
    }).responseText);
  };

  return Loader;

})();