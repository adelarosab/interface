# interface
Workaround to simulate interfaces for ES2015 (ES6) classes

```javascript
const Interface = require('interface'); 
// same as 
// import Interface from 'interface';
// define(['interface'], function(Interface) { ...

let OurInterface = Interface({
  run() {
    console.log('hello world');
  }
});

class OurInterfacedClass extends OurInterface() {}

// class Name extends Interface([BaseClass]) {}
// class Name extends OtherInterface(Interface([BaseClass])) {}

let myClass = new OurInterfacedClass();
myClass.run(); // 'hello world'

```
