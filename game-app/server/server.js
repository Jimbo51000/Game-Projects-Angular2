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
var gameHandler = require('./handlers/gameHandler');
var GameHandler = new gameHandler();



let io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('user connected :' + socket.id);

  socket.on('disconnect', function () {
    console.log('user disconnected');
    //TODO : remove player from the player list once hes disconnected
  });

  socket.on('add-player', (player) => {
    //console.log('socket add player hits');
    console.log("add user name :" + player.name);
    //add the new player
    var newPlayer = { 'id': socket.id.toString(), 'name': player.name };
    //dont use this. for the var declared above
    var canWeKeepHim = { value: false };
    var package = playerHandler.methods.addNewPlayer(newPlayer, canWeKeepHim);

    //on successful addition of new player add him to gameroom socket room
    if (canWeKeepHim.value) {
      socket.join('gameroom');
    }

    socket.emit('add-player-message', { type: 'success-message', package: package });
    io.emit('add-player-list', playerHandler.methods.getNewPlayer());


    //is the async nature of socket events a problem , the start-game never seems to be true;

    if (GameHandler.currentGameState == GameHandler.yetToStartGame && playerHandler.methods.doWeHaveMaxPlayers()) {
      GameHandler.changeCurrentGameState(GameHandler.gameHasStarted);
      var delay = 10000;
      io.to('gameroom').emit('start-game', { value: true, delay: delay });
      //if the game state is still gameHasStarted after delay then fire the gameplay events
      GameHandler.gameArenaRedirectTimer = setTimeout(() => {
        if (GameHandler.currentGameState == GameHandler.gameHasStarted) {
          console.log('hey this works after 10s');
          var currentPlayerTurn = playerHandler.methods.nextTurn();
          var socket = io.sockets.sockets[currentPlayerTurn.id];
          socket.emit('next-turn', { myturn: true });
          io.to('gameroom').emit('next-turn', { myturn: false, playerName: currentPlayerTurn.name });
        }

      }, delay);

      //TODO : from this point wait for 3 sec for all players to acknowledge the start game 
      // this is because some players might have left the gameroom
      // var currentPlayer = playerHandler.methods.nextTurn();
      // io.to(currentPlayer.id).emit('next-turn',function(){

      // });
    }

    //gameplay socket events
    //1.
    socket.on('player-key-pressed', function (obj) {
      socket.broadcast.to('gameroom').emit('other-player-key-pressed');
      if (playerHandler.methods.isPlayerCompletelyRight()) {
        playerHandler.methods.updateGameEntryString(obj.key);
        playerHandler.methods.resetAfterPlayerTurn();
        //next guys turn
        var nextPlayerTurn = playerHandler.methods.nextTurn();
        var socket = io.sockets.sockets[nextPlayerTurn.id];
        socket.emit('next-turn', { myturn: true });
        io.to('gameroom').emit('next-turn', { myturn: false, playerName: nextPlayerTurn.name });
      }
      else if (playerHandler.methods.playerIsRightTillNow(obj.key)) {
        playerHandler.data.playerEntryIndex += 1;
        socket.broadcast.to('gameroom').emit('other-player-key', { key: obj.key });
      }
      else {
        //the player has failed and needs to be removed from ui , player list and socket game room
        playerHandler.methods.removePlayerByTurnIndex();
        playerHandler.methods.resetAfterPlayerTurn();
        //NOTE : this behaviour might be unpredictable
        socket.emit('notification-message', { message: 'Oops , wrong key man . You are out !' });
        socket.broadcast.to('gameroom').emit('notification-message', { message: 'Damn , he s out!' });
        socket.emit('player-wrong-entry');
        io.to('gameroom').emit('remove-player-list', socket.id);
        socket.leave('gameroom');
        //next turn
        var nextPlayerTurn = playerHandler.methods.nextTurn();
        var socket = io.sockets.sockets[nextPlayerTurn.id];
        socket.emit('next-turn', { myturn: true });
        io.to('gameroom').emit('next-turn', { myturn: false, playerName: nextPlayerTurn.name });
      }
    });

    //2.
    socket.on('player-key-released', function (obj) {
      socket.broadcast.to('gameroom').emit('other-player-key-released');
    })

  });

  //3.
  socket.on('exit-gameroom', function (obj) {

    console.log('exit game room');

    playerHandler.methods.removePlayerBySocketId(socket.id);
    if (!playerHandler.methods.doWeHaveMaxPlayers() && GameHandler.currentGameState == GameHandler.gameHasStarted) {
      console.log('stop game');
      GameHandler.changeCurrentGameState(GameHandler.yetToStartGame);
      clearTimeout(GameHandler.gameArenaRedirectTimer);
      io.to('gameroom').emit('remove-player-list', socket.id);
      io.to('gameroom').emit('stop-game');
      socket.emit('notification-message', { message: 'You have exited the game room , join back ' });
      socket.leave('gameroom');
    }

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