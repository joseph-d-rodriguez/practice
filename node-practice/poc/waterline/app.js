var Waterline = require('waterline');
var orm = new Waterline();

// First require in waterline adapters.
var mongoAdapter = require('sails-mongo');

// Build Waterline connections config object.
var waterlineConfig = {
	// Setup Adapters that have been required.
	adapters: {
		'default': mongoAdapter,
		mongo: mongoAdapter
	},

	// Build Connections and setup with named adapter configs.
	connections: {
		connLocalMongo: {
			adapter: 'mongo',
			host: 'localhost',
			database: 'waterline-practice'
		}
	}
};

var Dog = Waterline.Collection.extend({

	identity: 'dog',
	connection: 'connLocalMongo',

	attributes: {
		name: 'string',
		breed: 'string',
		birthdate: 'date',
		type: 'string'
	}
});

orm.loadCollection(Dog);

orm.initialize(waterlineConfig, function waterlineInitializeHandler(initError, initializedOrm) {

	if (initError) { throw initError; }

	console.log('ORM Initialized!');

	var ormDog = initializedOrm.collections.dog;

	// Find all dogs.
	ormDog.find().exec(console.log);

	// Insert a dog.
	var newDog = {
		name: 'hard-coded dog',
		breed: 'hard-coded breed',
		type: 'hard-coded breed',
		birthdate: new Date()
	};
	ormDog.create(newDog).exec(function createHardCodedDog(createDogError, newHardCodedDog) {

		if (createDogError) { throw createDogError; }

		console.log('Your new hard-coded dog has been created here: ', newHardCodedDog);

		ormDog.find().exec(function findDogsAfterHardCodedCreate(findAfterCreateError, newFoundDogs) {
			
			if (findAfterCreateError) { throw findAfterCreateError; }

			console.log('After the new hard-coded dog was inserted, we now have all these dogs: ', newFoundDogs);
		});
	});
});
