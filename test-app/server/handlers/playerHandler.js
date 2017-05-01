
var players = [];
var maxPlayers = 5;
var newPlayer;
exports.methods = {

    init: function () {
        console.log('server init called');
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
    addNewPlayer: function (newplayer) {
        var message ;
        //reinitialize
        this.newPlayer=null;
        if (newplayer && this.players.length < 5) {
            //check if the player already exists
            for (var i in this.players) {
               // console.log(JSON.stringify(this.players));
                //console.log('player:'+JSON.stringify(this.players[0]));
                if (this.players[i].id === newplayer.id) {
                    //console.log('duplicate player');
                    message = "You have already joined !";
                    return {'message':message,'success':false};
                }
            }

            this.players.push(newplayer);
            this.newPlayer = newplayer;
            message = "You have entered the game room";
            return {'message':message,'success':true};
        }
        else {
            if(this.players.length>=5){
                return {'message':"Max players reached",'success':false};
            }
            if(!newplayer){
                return {'message':"Invalid player name",'success':false};
            }
           
        }
    },
    getAllPlayers: function () {
        return this.players;
    }
    ,
    getNewPlayer: function () {
        return this.newPlayer;
    }

}

//export only connstants here
exports.data = {
    maxPlayers
}

exports.newPlayer = function () {
    return this.newPlayer;
};