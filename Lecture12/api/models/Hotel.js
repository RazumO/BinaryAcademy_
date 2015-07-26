/**
* Hotel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var fs = require('fs');




module.exports = {
	hotels: '',
	hotelsArray: '',
	read: function () {
		fs.readFile('hotels.json', function (err, data) {
		  if (err) throw err;
		  this.hotels = JSON.parse(data.toString('utf8'));
		  return this.hotels;
		});
	},
	write: function () {
		fs.writeFile('hotels.json', JSON.stringify(hotels));
	}
	
};

