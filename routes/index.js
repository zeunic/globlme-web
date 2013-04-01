
/*
 * GET home page.
 */

 var request = require('request'),
	hash = require('node_hash');

exports.index = function(req, res){
	res.render('home', { title: 'Globl.me' });
};

exports.adventure = function(req,res){
	var results, requestData = {
			key: "globlme",
			auth: '',
			data: {
				"unique": Math.random(),
				"type": "adventure",
				"moments": "true"
			}
		};

	requestData.auth = hash.sha256( JSON.stringify( requestData.data ) + '3912b4f3-c9ab-4e2f-9007-424b5b1d5de6');

	var requestOptions = {
		uri: 'http://api.globl.me/v1.3/collection/' + req.adventureID,
		method: 'POST',
		json: requestData
	};

	if(req.adventureID) {
		request(requestOptions, function(err, response, result){
			console.log(result);
			res.render('index', { title: 'Adventure: ' + result.data.title, data: JSON.stringify(result) });
		});
	} else {
		res.render('index', { title: 'Error', data: false });
	}
	
};