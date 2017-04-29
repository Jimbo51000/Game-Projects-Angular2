
var players = [];
var maxPlayers = 5;

exports.methods = {

    init: function () {
        console.log('init called');
        this.players = [
            {
                "id": "1",
                "name": "Jimmy1"
            },
            {
                "id": "2",
                "name": "Akhil2"
            },
            {
                "id": "3",
                "name": "Arun3"
            } 
        ];
    }, 
    addNewPlayer: function (newplayer) {
        if (newplayer && this.players.length < 5) {
            this.players.push(newplayer);
            return true;
        }
        else {
            return false;
        }
    },
    getAllPlayers:function(){
        return this.players;
    }

}

exports.data={
    players,maxPlayers
}