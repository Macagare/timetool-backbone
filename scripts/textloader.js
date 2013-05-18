var TextLoader;

TextLoader = (function() {

  function TextLoader() {}

  TextLoader.files = {};

  TextLoader.load = function(path) {
    var _base;
    return (_base = this.files)[path] || (_base[path] = $.ajax({
      url: path,
      async: false
    }).responseText);
  };

  return TextLoader;

})();