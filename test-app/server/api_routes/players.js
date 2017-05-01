var express = require('express')
var router = express.Router()
var playerHandler = require('../handlers/playerHandler');


//api get the players list
router.get('/', function (req, res) {
    //TODO:the players are defined here , get them  off from here
    //console.log('get hits');
    players = playerHandler.methods.getAllPlayers();
    return res.json(players);
})
  
//api put call to add more players
router.put('/', function (req, res) {
    //console.log('put hits');
    //console.log("add user name :" + req.body.name);
    //add the new player
    var newPlayer = { "id": "0", "name": req.body.name };
    //dont use this. for the var declared above
    if (playerHandler.methods.addNewPlayer(newPlayer)) {
        res.json({ "success": true });
    }
    else { 
        res.json({ "success": false });
    }
    // res.send('seothing');
})

//api call to reset
router.get('/reset',function(req,res){
    playerHandler.methods.  init();
    res.sendStatus(200);
})

module.exports = router