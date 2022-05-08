// Require packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

// Setup HBS and views folder
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// To use files from public folder
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Routing to get all the beers
app.get('/beers', (req, res) => {
	punkAPI
		.getBeers()
		.then((beersFromAPI) => {
			res.render('beers', { beers: beersFromAPI });
		})
		.catch((error) => console.log(error));
});

// Routing to get a random beer
app.get('/random-beer', (req, res) => {
	punkAPI
		.getRandom()
		.then((beersFromAPI) => {
			const randomBeer = beersFromAPI[0];
			console.log("the beer:", randomBeer);
			res.render('random-beer', randomBeer);
		})
		.catch((error) => console.log(error));
});

// Running on port 3000
app.listen(3000, () => console.log('🏃‍ on port 3000'));
