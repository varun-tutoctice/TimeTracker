var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 

var user = require('./routes/user.js');
var admin = require('./routes/admin.js');
var timein = require('./routes/timein.js');
var timeout = require('./routes/timeout');

var port = process.env.PORT || config.serverport;


var assets = function (req, res) {


    var ST = new Date();
    ST.setHours(IST.getHours());
    ST.setMinutes(IST.getMinutes());


    var serve = function () {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write("day:" + ST.getDay() + "<br>");
        res.write("day:" + ST.getDay() + " " + ST.getHours() + " " + ST.getMinutes() + "<br>");
        var serverTime = new Date();
        res.write("server time: " + serverTime.getDay() + " " + serverTime.getHours() + " " + serverTime.getMinutes());
        res.end();
    };

    serve();
};



mongoose.connect(config.database, { useNewUrlParser: true }, function(err){
	if(err){
		console.log('Error connecting database, please check if MongoDB is running.');
	}else{
		console.log('Connected to database...');
	}
}); 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('body-parser').json({ type : '*/*' }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// basic routes

app.get('/', function(req, res) {
	res.send('Aurotech API is running at http://localhost:' + port + '/api');
});

//Registration Routes
app.post('/register', user.signup);
app.post('/adminregister', admin.signup);


// express router
var apiRoutes = express.Router();
app.use('/api', apiRoutes);

// Login Routes
apiRoutes.post('/login', user.login);
apiRoutes.post('/adminlogin', admin.login);


// Token Verify Setup
apiRoutes.use(user.authenticate); 
apiRoutes.use(admin.authenticate);


// authenticated routes
apiRoutes.get('/', function(req, res) {
	res.status(201).json({ message: 'Welcome to the authenticated routes!' });
});


//User Operation Routes
apiRoutes.get('/user/:id', user.getuserDetails);
apiRoutes.put('/user/:id', user.updateUser);
apiRoutes.put('/password/:id', user.updatePassword);
apiRoutes.get('/users', user.getUsers);
apiRoutes.get('/usercount', user.getusercount);

//admin operation routes
apiRoutes.get('/admin/:id', admin.getadminDetails);
apiRoutes.put('/admin/:id', admin.updateAdmin);
apiRoutes.put('/adminpassword/:id', admin.updateApassword);


//Timein Operation routes
apiRoutes.get('/timein', timein.gettimein);
apiRoutes.post('/timein/:id', timein.savetimein);
apiRoutes.get('/timein/:id', timein.gettimeinDetails);
apiRoutes.get('/timeinall', timein.gettimeinAll);
apiRoutes.get('/timeinalllimit', timein.gettimeinAlllimit);
apiRoutes.get('/timeincurrent', timein.gettimeincurrent);
apiRoutes.get('/timeindate/:id', timein.gettimeinDate);
apiRoutes.get('/timeinccount', timein.gettimeinccount);


//Timeout Operation routes
apiRoutes.post('/timeout/:id', timeout.savetimeout);
apiRoutes.get('/timeout', timeout.gettimeout);
apiRoutes.get('/timeoutcurrent', timeout.gettimeoutcurrent);
apiRoutes.get('/timeoutccount', timeout.gettimeoutccount);


// kick off the server 
app.listen(port);
console.log('Aurotech Timeinout app is listening at http://localhost:' + port);
