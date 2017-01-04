# interface
Interface simulation for ES2015 (ES6) classes.

First at all, you need to import interface.
```javascript
import Interface from 'interface';
```
or
```javascript
import {Interface} from 'interface';
```

Create our interface.
```javascript
const Observable = Interface({
  off(name, callback, context) { 
    // unbind listener
  },
  
  on(name, callback, context) {
    // bind listener
  },
  
  once(name, callback, context) {
    // bind listener once
  },
  
  trigger(name) {
    // trigger listeners bound to a name
  }
});
```

Use it!
```javascript
class Model extends Observable() {
  constructor() {
    this.on('change', this.save, this);
  }
  
  fetch() {
    // ajax request to fetch data
  }
  
  save(data) {
    // ajax request to save data
    this.trigger('change');
  }
}
```

So if you want to extend a class with a proper interface:
```javascript

const Renderable = Interface({
  render() {
    // render
  }
}) 

class ViewModel extends Renderable(Model) {}

let myViewModel = new ViewModel();

```

Note: If you need to use multiple interfaces as javascript inheritance is 
based on prototyping and mixins, you should keep in mind last element used 
around is overriding duplicated methods.

```javascript
const Runnable = Interface({
  run() {
    console.log('runnable');
    // do some stuff
  }
});

const Threadable = Interface({
  run() {
    console.log('threadable');
    // do some stuff
  }
});

class Process extends Threadable(Runnable()) {}

let process = new Process();
process.run(); // threadable

class Program extends Runnable(Threadable()) {}

let program = new Program();
program.run(); // runnable
```
I hope this explain better ^^.
