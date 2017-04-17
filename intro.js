var stampit = require('stampit');

// Why Stamps??
/*
Prototypal inheritance is great, and JavaScript's capabilities give us some
really powerful tools to explore it, but it could be easier to use.

Basic questions that I should be able to answer by the time I'm done with this:
1) How do I inherit privileged methods and private data?
  A:
2) What are some good alternative to inheritance hierarchies?
  A:

Answer both of these questions at the same time using `init()` and `compose`
from the `stamp-utils` library.
*/

// `compose(...composables: [...Composable]) => Stamp`
// (fn `compose` takes any number of composables and returns a new stamp)

// `init(...functions: [...Function]) => Stamp`
// (fn `init` takes any number of initializer functions and returns a new stamp)

// First, we'll use a closure to create data privacy:
const a = stampit()
.init(function() {
  const a = 'a';

  Object.assign(this, {
    getA() {
      return a;
    }
  });
});

console.log(' ');
console.log('* Example 1 *');
console.log(typeof a()); // object
console.log(a().getA()); // 'a'
console.log(a().a);      // undefined
console.log('---------');

// ~ In the above example, we are using FUNCTION SCOPE to encapsulate private data.
// * Note: The getter must be defined INSIDE the function in order to
//       access the closure variables.

//Another example:
const b = stampit()
.init(function () {
  const a = 'b';

  Object.assign(this, {
    getB () {
      return a;
    }
  });
});

console.log(' ');
console.log('* Example 2 *');
console.log(b().a); // undefined
console.log(b().getB()); // a
console.log('---------');
// Note: The 'a's are not typos -- the point is to demonstrate that `a` and
//       `b`'s private variables do not clash.

// Here's the real treat:
const c = stampit().compose(a, b);

const foo = c();

console.log(' ');
console.log('* Example 3 *')
console.log(foo.getA()); // 'a'
console.log(foo.getB()); // 'b'
console.log('---------');




















//.
