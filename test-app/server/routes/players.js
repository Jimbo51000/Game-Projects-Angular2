var express = require('express')
var router = express.Router()


//get the players list
router.get('/', function (req, res) {
    //TODO:the players are defined here , get them  off from here
    var players = [{ "id": "0", "name": "Jimmy1" },
      { "id": "1", "name": "Akhil" },
      { "id": "2", "name": "Arun" }];
      res.setHeader('Access-Control-Allow-Origin', '*');
  return res.json(players);
})

module.exports = router