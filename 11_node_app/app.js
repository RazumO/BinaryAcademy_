var http = require('http');
var path = require('path');
var casual = require('casual');
var fs = require('fs');
var buffer = require('buffer');
var _ = require('underscore');

//var mas = [];
// for (var i = 0; i < 150; i++) {
// 	var item = {
// 		ID: casual.country,
// 		Description: casual.description
// 	}
// 	mas.push(item);
// }

// fs.writeFileSync('countries.json', JSON.stringify(mas));

// for (var i = 0; i < 150; i++) {
// 	var item = {
// 		ID: i,
// 		Name: casual.company_name,
// 		Description: casual.description
// 	}
// 	mas.push(item);
// }

// fs.writeFileSync('hotels.json', JSON.stringify(mas));

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

var hotelsArray;



var server = http.createServer(function (req, res) {
	console.log(req.method, req.url);
	var method = req.method;
	var url = req.url;
	var index;
	if (method == "GET") {
		if (url == '/') {
			res.writeHead(200, {
				'Content-Type': 'text/html' //тут можна тестити
			});
			res.write(indexHTML);
		} else if (index = url.match(/^\/restapi\/hotel\/([1234567890]*)$/)) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			res.write(JSON.stringify(hotels[index[1]]));
		} else if (index = url.match(/^\/restapi\/country\/(.*)\/hotel$/)) {
			res.writeHead(200, {
				'Content-Type': 'application/json'
			});
			hotelsArray = _(hotels).toArray();
			hotelsInChoosenCountry = hotelsArray.filter(matchCountry, {country: index[1]});
			res.write(JSON.stringify(hotelsInChoosenCountry));
		} 
	} else  if (method == "POST") {
		if (index = url.match(/^\/restapi\/country$/)){
			req.on('data', function(chunk){
		        countriesArray = _(countries).toArray();
		        var jsonObj = JSON.parse(chunk);
		        countriesArray.push(jsonObj);
		        countries =  JSON.parse(JSON.stringify(countriesArray));
		        console.log(countries);
		    });
		} else if (index = url.match(/^\/restapi\/country\/(.*)\/hotel$/)){
			req.on('data', function(chunk){
		        hotelsArray = _(hotels).toArray();
		        var ID = hotelsArray.length;
		        var jsonChunk = JSON.parse(chunk);
		        var jsonObj = {
		        	'ID': ID,
		        	'Name': jsonChunk.Name,
		        	'Country': index[1],
		        	'Description': jsonChunk.Description,
		        }
		        console.log(jsonObj);
		        hotelsArray.push(jsonObj);
		        hotels =  JSON.parse(JSON.stringify(hotelsArray));
		        //console.log(hotels);
		    });
		}
		
	}
	res.end();
});
///^\/restapi\/hotels\/([1234567890])$/)

server.listen(8000);
console.log('Listening port 8000...');


function matchCountry (element) {
	return (element.Country == this.country);
}

