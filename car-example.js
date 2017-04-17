import { compose, init } from 'stampit';
const trace = label => value => {
  console.log(`\n \n ...${label}... \n`);
  console.log(value);
  console.log('\n ============= \n');
}

const engine = init (function() {
  Object.assign(this, {
    drive () {
      return 'Vrooooom!';
    },
    brake () {
      return 'Screeech!';
    }
  });
});

const bundle = compose ({
  methods: {
    upgrade() {
      if (this.bundle === 'Standard') {
        this.bundle = 'Premium';
        console.log('\n ~~~~ Bundle upgraded to Premium! ~~~~ \n');
        console.log('=============');
        return this;
      } else {
        console.log('\n ~~~~ Already upgraded to Premium! ~~~~ \n');
        console.log('=============');
        return this;
      }
    },
    getInterior () {
      return this.interior;
    },
    setInterior (option) {
      if (this.getInteriorOptions().includes(option)) {
        this.interior = option;
      } else {
        return "Oops! That's not a valid interior option."
      }
    },
    getInteriorOptions () {
      if ( this.bundle === 'Standard' ) return ['Leather']
      if ( this.bundle === 'Premium' ) return ['Leather', 'Wood', 'Pearl']
    }
  },
  properties: {
    bundle: 'Standard', // default is Standard
    interior: 'Leather' // default interior is leather
  }
});

const defaults = compose ({
  properties: {
    owner: 'CAR_NOT_SOLD',
    make: 'Subaru',
    model: 'Outback',
    year: 2012
  }
});

/*
Q: Allows you to override specific properties?
A:
*/
const overrides = init (function(overrides) {
  Object.assign(this, overrides)
});


// Q: Is this a Factory?
// A:
const car = compose (engine, bundle, defaults, overrides);

const aCar = car({ owner: 'Vince' });

// Defaults & Overrides -- Initial State of `aCar`
trace('DEFAULT: car()')(car());
trace('aCar = car({ owner: "Vince" })')(car({ owner: 'Vince' }));

// Engine Methods
trace('aCar.drive()')(aCar.drive());
trace('aCar.brake()')(aCar.brake());

// Bundle Methods
trace('aCar.getInterior')(aCar.getInterior()); // 'Leather'
trace('aCar.getInteriorOptions')(aCar.getInteriorOptions()); // [ 'Leather' ]

console.log('\n Upgrade the car...');
aCar.upgrade(); // 'Bundle upgraded to Premium!'
console.log('\n Try to upgrade again...');
aCar.upgrade(); // 'Already upgraded to Premium!'
trace('aCar.getInteriorOptions')(aCar.getInteriorOptions()); // [ 'Leather', 'Wood', 'Pearl' ]

console.log('\n Set interior to Wood...')
aCar.setInterior('Wood');
trace('aCar.getInterior()')(aCar.getInterior()); // Wood

trace("aCar.setInterior('NotAnOption')")(aCar.setInterior('NotAnOption'));
trace('aCar.getInterior()')(aCar.getInterior()); // Wood

console.log('\n Set interior to Pearl...')
aCar.setInterior('Pearl');
trace('aCar.getInterior()')(aCar.getInterior()); // Pearl

console.log('\n Set interior to Leather...')
aCar.setInterior('Leather');
trace('aCar.getInterior()')(aCar.getInterior()); // Leather

// Final State of `aCar`
trace('aCar')(aCar);


//Create a new car, upgrade it, and choose the Pearl interior
const bCar = car({ owner: 'Gina', model: 'Impreza', year: 2013 });
bCar.upgrade().setInterior('Pearl');
trace("bCar = car({ owner: 'Gina', model: 'Impreza', year: 2013 }).upgrade().setInterior('Pearl')")(bCar);















//.
