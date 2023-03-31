class ViewGame {

    constructor(game,ctx1,ctx2){
        this.game = game;
        this.dealerCtx = ctx1;
        this.playerCtx = ctx2;
        this.cardShapes = [];
        this.trickShapes = [];
        this.setupScreen();
        this.bindButton();
        this.buildCardShapes();
        this.buildTrickShapes();
        this.cardSelected = false;
    }

    buildCardShapes(){

    }

    buildTrickShapes(){

    }

    bindButton(){
        let button = document.getElementById("nextround");
        button.addEventListener('click',this.playRound.bind(this));
    }

    bindPlayer(){
        let canvas = document.getElementsById("player");
        canvas.addEventListener('click',this.handleCanvasClick.bind(this))
    }

    handleCanvasClick(e) {
        e.preventDefault();
        let xOffset = 200;
        let yOffset = 450;

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