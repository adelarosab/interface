import Interface from './index';

// -----------------------------------------------------------------------------

const Observable = Interface({
  off(name, callback) {
    if (!this._callbacks_ || !this._callbacks_[name]) { return; }

    const callbacks = this._callbacks_[name];
    while (callbacks.contains(callback)) {
      const index = callbacks.indexOf(callback);
      callbacks.splice(index, 1);
    }

    return this;
  },

  on(name, callback) {
    if (!this._callbacks_) { this._callbacks_ = {}; }
    if (!this._callbacks_[name]) { this._callbacks_[name] = []; }

    this._callbacks_[name].push(callback);

    return this;
  },

  once(name, callback) {
    const off = this.off;
    const once = function() {
      callback();
      off(name, callback);
    };

    return this.on(name, once);
  },

  trigger(name, ...arguments) {
    if (!this._callbacks_ || !this._callbacks_[name]) { return; }

    for (let callback of this._callbacks_[name]) { callback(...arguments); }

    return this;
  }
});

// -----------------------------------------------------------------------------

class Model extends Observable() {
  constructor(data = {}) {
    this._data_ = data;
  }

  get(name) {
    return this._data_[name];
  }

  set(name, value) {
    const old = this._data_[name];

    this._data_[name] = value;
    if (old !== value) {
      this.trigger('change', name, value);
      this.trigger(`change:${name}`, value, old);
    }
  }

  toJSON() { return Object.assign({}, this._data_); }
}

// -----------------------------------------------------------------------------

const Renderer = Interface({
  get data() { return {}; },
  render() {
    return this.template(this.data);
  },
  get template() { return function() {}; }
});

// -----------------------------------------------------------------------------

class View extends Renderer() {
  constructor(model) { this.model = model; }

  get data() { return this.model.toJSON(); }

  static get root() { return document.createElement('div'); }

  render() {
    let html = super.render();
    this.root.innerHTML(html);
  }
}

// -----------------------------------------------------------------------------
// My customization

function myTemplate(data = {}) {
  return `<h1>${data.title}</h1>`;
}

class MyView extends View {
  static get template() { return myTemplate; }
}

// -----------------------------------------------------------------------------
// My actual code
let myModel = new Model({title: 'Hello World'});
let myView = new MyView(myModel);

myView.render();

/*
 As you can see, now I can reuse code refering to behaviors.
 */
