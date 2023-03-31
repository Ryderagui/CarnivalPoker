class ViewGame {

    constructor(game,ctx1,ctx2){
        this.game = game;
        this.dealerCtx = ctx1;
        this.playerCtx = ctx2;
        this.setupScreen();
    }

    setupScreen(){
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
    }

    playRound(){
        this.game.nextRound();
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
    }


}

module.exports = ViewGame;