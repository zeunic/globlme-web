
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.param(':adventureID', function(req, res, next, adventureID){
	req.adventureID = adventureID.substring(2, adventureID.length-3);

	console.log(adventureID);
	console.log(req.adventureID);

	if(req.adventureID) {
		next();
	} else {
		// to do need error page
		console.log('render error page');
	}
});

app.get('/', routes.index);
app.get('/adventures/:adventureID', routes.adventure);

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
