var express = require('express')
var router = express.Router()
var playerHandler = require('../handlers/playerHandler');



//get the players list
router.get('/', function (req, res) {
    //TODO:the players are defined here , get them  off from here
    console.log('get hits');
    players = playerHandler.methods.getAllPlayers();
    return res.json(players);
})

 
router.put('/', function (req, res) {
    console.log('put hits');
    console.log("add user name :" + req.body.name);
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


module.exports = router