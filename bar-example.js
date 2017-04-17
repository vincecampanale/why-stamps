// The stuff in intro was easy, let's see what else is on tap
import { compose, init } from 'stampit';

// Some more privileged methods, with some private data.
const availability = init(function () {
  let isOpen = false; // private

  Object.assign(this, {
    open () {
      isOpen = true;
      return this;
    },
    close() {
      isOpen = false;
      return this;
    },
    isOpen() {
      return isOpen;
    }
  });
});

// Here's a stamp with public methods, and some state:
const membership = compose({
  methods: {
    add (member) {
      this.members[member.name] = member;
      return this;
    },
    getMember (name) {
      return this.members[name];
    }
  },
  properties: {
    members: {}
  }
});

// Let's set some defaults:
const defaults = compose ({
  properties: {
    name: 'The Saloon',
    specials: 'Whisky, Gin, Tequila'
  }
});

const overrides = init(function (overrides) {
  Object.assign(this, overrides);
});

// Classical inheritances has nothing on this. No parent/child coupling.
// No deep inheritance hierarchies.
// Just good, clean code reusability.
const bar = compose(availability, membership, defaults, overrides);
const myBar = bar();

// Silly, but proves that everything is as it should be.
const result = myBar.add({name: 'Homer'}).open().getMember('Homer');

console.log(result); // { name: 'Homer' }
console.log(`
  name: ${ myBar.name },
  isOpen: ${ myBar.isOpen() },
  specials: ${ myBar.specials }
`);
/*
  name: Moe's
  isOpen: true
  specials: Whisky, Gin, Tequila
*/


























//.
