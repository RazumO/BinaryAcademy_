/**
 * CountryController
 *
 * @description :: Server-side logic for managing countries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');
var _ = require('underscore');

var countries;
fs.readFile('countries.json', function (err, data) {
  if (err) throw err;
  countries = JSON.parse(data.toString('utf8'));
});

setInterval(function () {
	fs.writeFile('countries.json', JSON.stringify(countries));
	//fs.writeFile('hotels.json', JSON.stringify(hotels));
}, 20000);

var countriesArray;

module.exports = {
	addNewCountry: function (req, res) {
		chunk = req.body;	
		countriesArray = _(countries).toArray();
		console.log(chunk);
		countriesArray.push(chunk);
		countries =  JSON.parse(JSON.stringify(countriesArray));
	}
};

