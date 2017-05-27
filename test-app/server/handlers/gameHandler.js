
var playerHandler = require('./handlers/playerHandler');

var isGameStarted ;
var gameS
exports.methods = {
    canWeStartTheGameNow: function () {

        this.isGameStarted =  playerHandler.methods.canWeStartTheGameNow();
    }
};