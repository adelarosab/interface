(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'function' && typeof module !== 'undefined') {
    module.exports = factory();
  }
}(this, function() {
  return function Interface(prototype) {
    return function(parent = function() {}) {
      for (let key in prototype) {
        if (prototype.hasOwnProperty(key)) {
          parent.prototype[key] = prototype[key];
        }
      }

      return parent;
    };
  };
}));
