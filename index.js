function Interface(prototype) {
  return function(parent = class {}) {
    const base = class extends parent {};

    Object.assign(
      base.prototype,
      prototype
    );

    return base;
  };
};

export {Interface, Interface as default};
