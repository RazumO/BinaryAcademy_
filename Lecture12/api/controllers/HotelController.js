/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var fs = require('fs');

//var _ = require('underscore');
var fs = require('fs');
var _ = require('underscore');
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();

var hotels;
fs.readFile('hotels.json', function (err, data) {
    if (err) throw err;
    hotels = JSON.parse(data.toString('utf8'));
});

setInterval(function () {
	//fs.writeFile('countries.json', JSON.stringify(countries));
	fs.writeFile('hotels.json', JSON.stringify(hotels));
}, 20000);

var hotelsArray;

function matchCountry (element) {
	return (element.Country == this.country);
}

function matchId (element) {
	return (element.ID == this.ID);
}


module.exports = {
	getHotel: function (req, res) {
		res.send(hotels[req.params.id]);
	},
	getHotelsInCountry: function (req, res) {
		hotelsArray = _(hotels).toArray();
		var hotelsInChoosenCountry = hotelsArray.filter(matchCountry, {country: req.params.id});
		res.send(JSON.stringify(hotelsInChoosenCountry));
	},
	deleteHotel: function (req, res) {
		hotelsArray = _(hotels).toArray();
		var hotelIndexToRemove = _.findIndex(hotelsArray, matchId, {ID: req.params.id});
		console.log("Old " + hotelIndexToRemove + ' element' ,hotels[hotelIndexToRemove]);
		hotelsArray.splice(hotelIndexToRemove, 1);
		hotels =  JSON.parse(JSON.stringify(hotelsArray));
		console.log("New " + hotelIndexToRemove + ' element', hotels[hotelIndexToRemove]);
	},
	addHotelInCountry: function (req, res) {
		var chunk = req.body;
		//console.log(chunk);
		hotelsArray = _(hotels).toArray();
		var ID = hotelsArray.length;
		var jsonObj = {
			'ID': ID,
			'Name': chunk.Name,
			'Country': req.params.id,
			'Description': chunk.Description,
		}
		console.log(jsonObj);
		hotelsArray.push(jsonObj);
		hotels =  JSON.parse(JSON.stringify(hotelsArray));	
	},
	changeHotelInfo: function (req, res) {
		hotelsArray = _(hotels).toArray();
		var hotelIndexToUpdate = _.findIndex(hotelsArray, matchId, { ID: req.params.id });
		console.log("Old " + hotelIndexToUpdate + ' element' ,hotels[hotelIndexToUpdate]);
		var hotelToUpdate = hotelsArray[hotelIndexToUpdate];
		var jsonObj = req.body;
		if(jsonObj.Name) {
			hotelToUpdate.Name = jsonObj.Name;
		}
		if(jsonObj.Description) {
			hotelToUpdate.Description = jsonObj.Description;
		}
		if(jsonObj.Country) {
			hotelToUpdate.Country = jsonObj.Country;
		}
		hotels =  JSON.parse(JSON.stringify(hotelsArray));
		console.log("New " + hotelIndexToUpdate + ' element', hotels[hotelIndexToUpdate]);
	},
	badRequest: function (req, res) {
		res.badRequest("Sorry! Your request is wrong!")
	},
	notFound: function (req, res) {
		res.notFound('fsdf');
	},
	badReqTemplate: function (req, res) {
		res.view('bad', {message: "You've done bad request!"});
	}



};

