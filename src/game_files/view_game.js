class ViewGame {

    constructor(game,ctx1,ctx2){
        this.game = game;
        this.dealerCtx = ctx1;
        this.playerCtx = ctx2;
        this.allCards = [];
        this.allTricks = [];
        this.setupScreen();
        this.bindButton();
        this.buildTricksCards();
        this.bindPlayer();
        this.cardSelected = false;
    }

    buildTricksCards(){
        // 2D array, first item is the shape array. second item is the card.
        // Loop through player tricks and build each card. 
        let tricks = this.game.player.tricks;
        let allCards = [];
        let allTricks = [];
        for(let i = 0;i<tricks.length;i++){
            let trick = tricks[i];
            allTricks.push(trick);
            for(let j = 0;j<trick.length;j++){
                let card = trick[j];
                allCards.push(card);
            }
        }
    }
    
    tracePath(object,ctx){
        let points = object.points;
        ctx.beginPath();
        ctx.moveTo(points[0].x,points[0].y);
        for(let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x,points[i].y);
        }
    }

    bindButton(){
        let button = document.getElementById("nextround");
        button.addEventListener('click',this.playRound.bind(this));
    }

    bindPlayer(){
        let canvas = document.getElementById("player");
        console.log(canvas,"canvasgrabbed");
        canvas.addEventListener('click',this.handleCanvasClick.bind(this))
    }

    handleCanvasClick(e) {
        e.preventDefault();
        console.log("Click detected")
        let xOffset = 0;
        let yOffset = 450;
        let mouseX = parseInt(e.clientX - xOffset);
        let mouseY = parseInt(e.clientY - yOffset);
        console.log([e.clientX,e.clientY],"Event Mouse Click Array")
        console.log([mouseX,mouseY],"Mouse Click Pos After Offsets")
        // see if a card has been clicked on
        for(let i =0;i<this.allCards.length;i++){
            let card = this.allCards[i];
            tracePath(card,this.playerCtx);
            if (this.playerCtx.isPointinPath(mouseX,mouseY)){
                this.cardSelected = true;
                card.selected = true;
                alert("Grabbed Card");
            }
        }
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