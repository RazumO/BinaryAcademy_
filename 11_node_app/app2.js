var path = require('path');
var casual = require('casual');
var fs = require('fs');
var buffer = require('buffer');
var _ = require('underscore');
var express = require('express');
var app = express();

var hotels;
fs.readFile('hotels.json', function (err, data) {
  if (err) throw err;
  hotels = JSON.parse(data.toString('utf8'));
});

var countries;
fs.readFile('countries.json', function (err, data) {
  if (err) throw err;
  countries = JSON.parse(data.toString('utf8'));
});

fs.readFile('index.html', function (err, data) {
  if (err) throw err;
  indexHTML = data.toString('utf8');
});

//Обновляю данные каждые 20 секунд
setInterval(function () {
	fs.writeFile('countries.json', JSON.stringify(countries));
	fs.writeFile('hotels.json', JSON.stringify(hotels));
}, 20000);

var hotelsArray;
var countriesArray;

app.get('/', function (req, res) {
	res.send(indexHTML);	
});

var server = app.listen(8000, function () {
	console.log('Listening port 8000...');
});

app.get('/', function (req, res) {
	res.send(indexHTML);	
});

app.get('/restapi/hotel/:id', function (req, res) {
	res.send(JSON.stringify(hotels[req.params.id]));	
});


// Не смог найти как сделать, не конектится

app.get('/restapi/country/:id/hotel', function (req, res) {
	hotelsArray = _(hotels).toArray();
	hotelsInChoosenCountry = hotelsArray.filter(matchCountry, {country: req.params.id});
	res.write(JSON.stringify(hotelsInChoosenCountry));
});

//////////////////////////////////

function matchCountry (element) {
	return (element.Country == this.country);
}

app.post('/restapi/country', function (req, res) {
	req.on('data', function(chunk){
		countriesArray = _(countries).toArray();
		var jsonObj = JSON.parse(chunk);
		countriesArray.push(jsonObj);
		countries =  JSON.parse(JSON.stringify(countriesArray));
		//console.log(jsonObj);
		console.log(countries);
	});
});

app.delete('/restapi/hotel/:id', function(req, res) {
	hotelsArray = _(hotels).toArray();
	var hotelIndexToRemove = _.findIndex(hotelsArray, matchId, {ID: req.params.id});
	console.log("Old " + hotelIndexToRemove + ' element' ,hotels[hotelIndexToRemove]);
	hotelsArray.splice(hotelIndexToRemove, 1);
	hotels =  JSON.parse(JSON.stringify(hotelsArray));
	console.log("New " + hotelIndexToRemove + ' element', hotels[hotelIndexToRemove]);
});

function matchId (element) {
	return (element.ID == this.ID);
}

app.put('/restapi/hotel/:id', function(req, res) {
	req.on('data', function(chunk) {
		hotelsArray = _(hotels).toArray();
		var hotelIndexToUpdate = _.findIndex(hotelsArray, matchId, {ID: req.params.id});
		console.log("Old " + hotelIndexToUpdate + ' element' ,hotels[hotelIndexToUpdate]);
		var hotelToUpdate = hotelsArray[hotelIndexToUpdate];
		var jsonObj = JSON.parse(chunk);
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
	});
});
