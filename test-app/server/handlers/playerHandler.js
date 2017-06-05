
var players = [];
var maxPlayers = 2;
var newPlayer;
var turnIndex;
exports.methods = {

    init: function () {
        console.log('server init called');
        this.maxPlayers = 2;
        this.turnIndex = -1;
        this.players = [
            // {
            //     "id": "1",
            //     "name": "Jimmy1"
            // },
            // {
            //     "id": "2",
            //     "name": "Akhil2"
            // },
            // {
            //     "id": "3",
            //     "name": "Arun3"
            // } 
        ];
    },
    addNewPlayer: function (newplayer,canWeKeepHim) {
        var message;
        //reinitialize
        this.newPlayer = null;
        //var maxPlayers = 2;
        //this.maxPlayers = Number(this.maxPlayers);
        console.log('cond:' + this.players.length + "," + this.maxPlayers);

        if (newplayer && this.players.length < this.maxPlayers) {
            //check if the player already exists
            for (var i in this.players) {
                // console.log(JSON.stringify(this.players));
                //console.log('player:'+JSON.stringify(this.players[0]));
                if (this.players[i].id === newplayer.id) {
                    //console.log('duplicate player');
                    message = "You have already joined !";
                    return { 'message': message, 'success': false };
                }
            }

            this.players.push(newplayer);
            this.newPlayer = newplayer;
            canWeKeepHim.value = true;
            message = "You have entered the game room";
            return { 'message': message, 'success': true };
        }
        else {
            if (this.players.length >= this.maxPlayers) {
                return { 'message': "Max players reached", 'success': false };
            }
            if (!newplayer) {
                return { 'message': "Invalid player name", 'success': false };
            }

            return { 'message': "Something wrong with the server", 'success': false };
        }
    },
    getAllPlayers: function () {
        return this.players;
    }
    ,
    getNewPlayer: function () {
        return this.newPlayer;
    }
    ,
    doWeHaveMaxPlayers: function () {

        return this.players.length == this.maxPlayers;
    }
    ,
    nextTurn: function () {
        this.turnIndex = (this.turnIndex + 1) % this.maxPlayers;
        return this.players[this.turnIndex];
    }
    ,
    removePlayerBySocketId: function (id) {
        for (var i = 0; i <= this.players.length; i++) {
            var currentPlayer = this.players[i];
            if (currentPlayer.id == id) {
                this.players.splice(i, 1);
            }
        }
    }
}

//export only connstants here
exports.data = {
    maxPlayers
}

exports.newPlayer = function () {
    return this.newPlayer;
};