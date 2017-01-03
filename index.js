function Interface(prototype) {
  return function(parent = class {}) {
    const base = class {};

    Object.assign(
      base.prototype,
      parent,
      prototype
    );

    return base;
  };
};

export {Interface, Interface as default};
