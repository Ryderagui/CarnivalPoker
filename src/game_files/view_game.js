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
        // console.log(tricks,"player tricks");
        for(let i = 0;i < tricks.length;i++){
            let trick = tricks[i];
            allTricks.push(trick);
            // console.log(trick,"a grabbed trick");
            for(let j = 0; j < trick.cards.length ; j++){
                let card = trick.cards[j];
                // console.log(card,"a grabbed card");
                allCards.push(card);
            }
        }
        this.allCards = allCards;
        this.allTricks = allTricks;
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
        // console.log(canvas,"canvasgrabbed");
        canvas.addEventListener('click',this.handleCanvasClick.bind(this))
    }

    handleCanvasClick(e) {
        e.preventDefault();
        console.log("Click detected")
        console.log(this.cardSelected,"Card Selected?")
        let xOffset = 0;
        let yOffset = 450;
        let mouseX = parseInt(e.clientX - xOffset);
        let mouseY = parseInt(e.clientY - yOffset);
        console.log([e.clientX,e.clientY],"Event Mouse Click Array")
        console.log([mouseX,mouseY],"Mouse Click Pos After Offsets")
        console.log([this.allCards.length],"Card Array Length");
        console.log([this.allTricks.length],"Trick Array Length");
        // see if a card has been clicked on
        if(this.cardSelected === false){
            for(let i =0; i< this.allCards.length;i++){
                let card = this.allCards[i];
                console.log(card.pos,"Card Pos");
                this.tracePath(card,this.playerCtx);
                if (this.playerCtx.isPointInPath(mouseX,mouseY)){
                    this.cardSelected = card;
                    card.selected = true;
                    console.log(card,"grabbed card");
                    break;
                    
                }
            }
        }
        else if(this.cardSelected){
            for(let i = 0; i < this.allTricks.length;i++){
                let trick = this.allTricks[i];
                console.log(trick.pos,"Trick Pos");
                this.tracePath(trick,this.playerCtx);
                if (this.playerCtx.isPointInPath(mouseX,mouseY)){
                    console.log(trick,"grabbed trick");
                    this.moveCard(this.cardSelected,trick);
                    this.game.player.animate(this.playerCtx);
                }
            }
        }
    }

    moveCard(card,trick){
        let ownerid = card.trickid;
        let owner;
        this.allTricks.forEach((trick) =>{
            if(trick.trickid === ownerid){
                owner = trick;
                owner.removeCard(card);
                owner.updateCards();
                owner.evaluatePoker();
            }
        })
        trick.addCard(card);
        trick.updateCards();
        trick.evaluatePoker();
        this.cardSelected = false;
    }


    setupScreen(){
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
    }

    playRound(){
        this.game.nextRound();
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
        this.dealerCtx.font = "40px Arial";
        this.dealerCtx.fillStyle = "black";
        this.dealerCtx.fillText(`Round ${this.game.round}`,1010,100);
        this.dealerCtx.font = "20px Arial";
        let remRounds = 20-this.game.round;
        this.dealerCtx.fillText(`Remaining Rounds:`,1010,160);
        this.dealerCtx.fillText(`${remRounds}`,1090,190);
        this.buildTricksCards();
    }


}

module.exports = ViewGame;