var express = require('express')
var app = express()


//this function is needed to handle the CORS request header requirements
app.use(function (req, res, next) {
  //TODO: why isn't this working , should this be applied everywhere ?
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,Access-Control-Allow-Origin');
  // console.log('somehting happening here');
  // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  // console.log(req.method + "@" + fullUrl);
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
    //move on
    next();
  }
})

/*
*set up the body parser middleware and set this code up in the beginning before the routes take over
*/

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
  


//set the routes
var players = require('./routes/players');
app.use('/api/players', players);

var playerHandler = require('./handlers/playerHandler');

app.get('/',function(req,res){
  console.log('default to test Server ');
  res.sendStatus(200);//OK
})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
    //this init will load the players list 
  //this data will be persistant throughout since the playerHandler instance is declared once and used
  playerHandler.methods.init();
})