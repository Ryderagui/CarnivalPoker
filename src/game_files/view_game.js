const Util = require("./util")

class ViewGame {

    constructor(game,ctx1,ctx2,pos){
        this.game = game;
        this.dealerCtx = ctx1;
        this.playerCtx = ctx2;
        this.allCards = [];
        this.allTricks = [];
        this.setupScreen();
        this.buildTricksCards();
        this.bindPlayer();
        this.bindDealer();
        this.cardSelected = false;
        this.pos = pos;
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

    bindPlayer(){
        let canvas = document.getElementById("player");
        // console.log(canvas,"canvasgrabbed");
        canvas.addEventListener('click',this.handlePlayerCanvasClick.bind(this))
    }
    bindDealer(){
        let canvas = document.getElementById("dealer");
        // console.log(canvas,"canvasgrabbed");
        canvas.addEventListener('click',this.handleDealerCanvasClick.bind(this))
    }
    handleDealerCanvasClick(e) {
        e.preventDefault();
        console.log("Click detected")
     
        let xOffset = this.pos[0];
        let yOffset = this.pos[1];
        let mouseX = parseInt(e.clientX - xOffset);
        let mouseY = parseInt(e.clientY - yOffset);
        console.log([e.clientX,e.clientY],"Event Mouse Click Array")
        console.log([mouseX,mouseY],"Mouse Click Pos After Offsets")
        const newScoreRoundButton = [[515,345],[160,80]];
        const newScoreRoundButtonPoints = Util.createPoints(newScoreRoundButton[0],newScoreRoundButton[1]);
        let points = {points: newScoreRoundButtonPoints}
        this.tracePath(points,this.dealerCtx)
        if(this.dealerCtx.isPointInPath(mouseX,mouseY)){
            console.log("Click on Score Round");
            this.playRound();
        }

    }

    handlePlayerCanvasClick(e) {
        e.preventDefault();
        console.log("Click detected")
        // console.log(this.cardSelected,"Card Selected?")
        let xOffset = this.pos[0];
        let yOffset = 500 + this.pos[1];
        let mouseX = parseInt(e.clientX - xOffset);
        let mouseY = parseInt(e.clientY - yOffset);
        console.log([e.clientX,e.clientY],"Event Mouse Click Array")
        console.log([mouseX,mouseY],"Mouse Click Pos After Offsets")
        // console.log([this.allCards.length],"Card Array Length");
        // console.log([this.allTricks.length],"Trick Array Length");
        // see if a card has been clicked on
        if(this.cardSelected === false){
            for(let i =0; i< this.allCards.length;i++){
                let card = this.allCards[i];
                // console.log(card.pos,"Card Pos");
                this.tracePath(card,this.playerCtx);
                if (this.playerCtx.isPointInPath(mouseX,mouseY)){
                    this.cardSelected = card;
                    card.selected = true;
                    console.log(card,"grabbed card");
                    this.game.player.animate(this.playerCtx);
                    this.buildTricksCards();
                    break;
                    
                }
            }
        }
        else if(this.cardSelected){
            for(let i = 0; i < this.allTricks.length;i++){
                let trick = this.allTricks[i];
                // console.log(trick.pos,"Trick Pos");
                this.tracePath(trick,this.playerCtx);
                if (this.playerCtx.isPointInPath(mouseX,mouseY)){
                    console.log(trick,"grabbed trick");
                    this.moveCard(this.cardSelected,trick);
                    this.game.player.animate(this.playerCtx);
                    this.buildTricksCards();
                }
            }
        }
        const newTrickButton = [[1020,100],[80,80]];
        const newCardButton = [[1020,200],[55,80]];
        const newTrickButtonPoints = Util.createPoints(newTrickButton[0],newTrickButton[1]);
        const newCardButtonPoints = Util.createPoints(newCardButton[0],newCardButton[1]);
        // Eventually need to error handle if there isnt enough gold
        if(this.game.player.gold >= 6){
            let points = {points: newTrickButtonPoints}
            this.tracePath(points,this.playerCtx)
            if(this.playerCtx.isPointInPath(mouseX,mouseY)){
                console.log("Clicked on Trick Button");
                this.game.player.activateNextTrick();
                this.game.player.gold -= 6;
                this.game.player.animate(this.playerCtx);
                this.buildTricksCards();
            }
        }
        // Eventually error handle not enough gold
        if(this.game.player.gold >= 2){
            let points = {points: newCardButtonPoints}
            this.tracePath(points,this.playerCtx)
            if(this.playerCtx.isPointInPath(mouseX,mouseY)){
                console.log("Clicked on Card Button");
                this.game.drawPlayer();
                this.game.player.gold -= 2;
                this.game.player.animate(this.playerCtx);
                this.buildTricksCards();
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
        if(trick.addCard(card)){
        trick.updateCards();
        trick.evaluatePoker();
        this.cardSelected.selected = false;
        this.cardSelected = false;
        }else{
            owner.addCard(card)
            owner.updateCards();
            owner.evaluatePoker();
            this.cardSelected.selected = false;
            this.cardSelected = false;
        }
    }


    setupScreen(){
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
        this.animateRounds();
    }

    animateRounds(){
        // Eventually move this to the dealer class
        this.dealerCtx.font = "40px Arial";
        this.dealerCtx.fillStyle = "black";
        this.dealerCtx.onload = ()=> {
        this.dealerCtx.fillText(`Round ${this.game.round}`,1010,100);
        this.dealerCtx.font = "20px Arial";
        let remRounds = 10-this.game.round;
        this.dealerCtx.fillText(`Remaining Rounds:`,1010,160);
        this.dealerCtx.fillText(`${remRounds}`,1090,190);
        }
        this.dealerCtx.fillText(`Round ${this.game.round}`,1010,100);
        this.dealerCtx.font = "20px Arial";
        let remRounds = 10-this.game.round;
        this.dealerCtx.fillText(`Remaining Rounds:`,1010,160);
        this.dealerCtx.fillText(`${remRounds}`,1090,190);
        this.dealerCtx.fillStyle = "#777777"
        this.dealerCtx.fillRect(515,345,160,80)
        this.dealerCtx.fillStyle = "black";
        this.dealerCtx.fillText(`Score Round`,535,395);
        //+20,+50
    }

    playRound(){
        this.game.nextRound();
        this.game.dealer.animate(this.dealerCtx);
        this.game.player.animate(this.playerCtx);
        this.animateRounds();
        this.buildTricksCards();
        const roundscore = document.getElementById("roundscore");
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        roundscore.style.display = "flex";
    }


}

module.exports = ViewGame;