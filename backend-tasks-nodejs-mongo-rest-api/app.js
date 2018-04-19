var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./restapi/models/taskModel'),
  bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tasks', { useMongoClient: true });

var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./restapi/routes/taskRoutes');
routes(app);



/*
var express = require('express')
  ,cors = require('cors')
  , app = express();

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
  'localhost:4200',
   'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));
*/
app.use(cors());

app.use(function(req, res, next) {
    //res.status(404).send({url: req.originalUrl + ' not found'})
/*
    // Website you wish to allow to connect 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');//, OPTIONS, PUT, PATCH, DELETE

    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Cookie, Referer, Connection, Host, If-None-Match, User-Agent');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
*/
/*

Content-type: application/json
    Accept:application/json, text/plain,
Accept-Encoding:gzip, deflate, br
Accept-Language:es,en;q=0.9
Connection:keep-alive
Host:localhost:3000
If-None-Match:W/"293-dmPDsfViVGiZKMG4gUFjP2psh7Q"
Origin:http://localhost:4200
Referer:http://localhost:4200/
User-Agent:M
*/

});

app.listen(port);

console.log('Tasks Website -  RESTful web services with Nodejs started on: ' + port);
