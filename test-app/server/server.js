var express = require('express')
var app = express()

//socket connect code
let http = require('http').Server(app);

//this function is needed to handle the CORS request header requirements
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,Access-Control-Allow-Origin');

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
var players = require('./api_routes/players');
app.use('/api/players', players);

var playerHandler = require('./handlers/playerHandler');




let io = require('socket.io')(http);
  
io.on('connection', (socket) => {
  console.log('user connected :' + socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('add-player', (player) => {
    //console.log('socket add player hits');
    console.log("add user name :" + player.name);
    //add the new player
    var newPlayer = { 'id': socket.id.toString(), 'name': player.name };
    //dont use this. for the var declared above
    var package = playerHandler.methods.addNewPlayer(newPlayer);

    socket.emit('add-player-message', { type: 'success-message', package: package });
    io.emit('update-player-list', playerHandler.methods.getNewPlayer());
  });
});



app.get('/', function (req, res) {
  console.log('default to test Server ');
  res.sendStatus(200);//OK
});

http.listen(3000, () => {
  console.log('started on port 3000');
  //this init will load the players list 
  //this data will be persistant throughout since the playerHandler instance is declared once and used
  playerHandler.methods.init();
});