
module.exports = class GameHandler {
    constructor() {
        this.yetToStartGame = 0;
        this.gameHasStarted = 1;
        this.someOneIsPlaying = 2;
        this.gameHasEnded = 3;
        this.currentGameState = this.yetToStartGame;

    }
    
     changeCurrentGameState(state){
            this.currentGameState = state;
    }

};
