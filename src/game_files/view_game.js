const Util = require("./util")
const Game = require("./game")
const Card = require("./card")
const Trick = require("./trick")
class ViewGame {

    constructor(game,ctx,pos,canvasSize){
        this.canvasSize = canvasSize;
        this.game = game;
        this.gameCtx = ctx;
        this.allCards = [];
        this.allTricks = [];
        this.setupScreen();
        this.buildTricksCards();
        this.bindCanvas();
        this.cardSelected = false;
        this.pos = pos;
        this.scaler = 1;
        this.calcScaler();
        console.log(this.scaler,"this.scaler")
    }

    calcScaler(){
        if(this.canvasSize[0] === 900){
            return this.scaler = 0.75;
        }else if(this.canvasSize[0] === 1500){
            return this.scaler = 1.25;
        }
    }

    resetCardLinks(){
        let tricksidx = [1,2,3,4,5,6,7,8]
        let cardsidx = [0,1,2,3,4]

        for(let i = 1;i<tricksidx.length;i++){
            for(let j = 0;j<cardsidx.length;j++){
                let cardobj = document.getElementById(`${i}-${j}`);
                cardobj.src = "./images/transparent.png";
            }
        }
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

    bindCanvas(){
        let canvas = document.getElementById("game");
        // console.log(canvas,"canvasgrabbed");
        canvas.addEventListener('click',this.handleCanvasClick.bind(this))
    }
    // bindDealer(){
    //     let canvas = document.getElementById("game");
    //     // console.log(canvas,"canvasgrabbed");
    //     canvas.addEventListener('click',this.handleDealerCanvasClick.bind(this))
    // }
    // handleDealerCanvasClick(e) {
    //     e.preventDefault();
    //     console.log("Click detected")
     
    //     let xOffset = this.pos[0];
    //     let yOffset = this.pos[1];
    //     let mouseX = parseInt(e.clientX - xOffset);
    //     let mouseY = parseInt(e.clientY - yOffset);
    //     console.log([e.clientX,e.clientY],"Event Mouse Click Array")
    //     console.log([mouseX,mouseY],"Mouse Click Pos After Offsets")
    //     const newScoreRoundButton = [[1000,345],[160,80]];
    //     const newScoreRoundButtonPoints = Util.createPoints(newScoreRoundButton[0],newScoreRoundButton[1]);
    //     let points = {points: newScoreRoundButtonPoints}
    //     this.tracePath(points,this.gameCtx)
    //     if(this.gameCtx.isPointInPath(mouseX,mouseY)){
    //         console.log("Click on Score Round");
    //         this.playRound();
    //     }

    // }

    handleCanvasClick(e) {
        // e.preventDefault();
        // console.log("Click detected")
        // console.log(this.cardSelected,"Card Selected?")
        let xOffset = this.pos[0];
        let yOffset = this.pos[1];
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
                this.tracePath(card,this.gameCtx);
                if (this.gameCtx.isPointInPath(mouseX,mouseY)){
                    this.cardSelected = card;
                    card.selected = true;
                    // console.log(card,"grabbed card");
                    this.game.player.animate(this.gameCtx);
                    this.buildTricksCards();
                    break;
                    
                }
            }
        }
        else if(this.cardSelected){
            for(let i = 0; i < this.allTricks.length;i++){
                let trick = this.allTricks[i];
                // console.log(trick.pos,"Trick Pos");
                this.tracePath(trick,this.gameCtx);
                if (this.gameCtx.isPointInPath(mouseX,mouseY)){
                    // console.log(trick,"grabbed trick");
                    this.moveCard(this.cardSelected,trick);
                    this.game.player.animate(this.gameCtx);
                    this.buildTricksCards();
                }
            }
        }
        const newTrickButton = [[(995/1200)*this.canvasSize[0],(515/800)*this.canvasSize[1]],[Card.CARDWIDTH+Card.CARDWIDTH*0.25,Card.CARDHEIGHT]];
        const newCardButton = [[(1020/1200)*this.canvasSize[0],(405/800)*this.canvasSize[1]],[Card.CARDWIDTH,Card.CARDHEIGHT]];
        const newTrickButtonPoints = Util.createPoints(newTrickButton[0],newTrickButton[1]);
        const newCardButtonPoints = Util.createPoints(newCardButton[0],newCardButton[1]);
        // Eventually need to error handle if there isnt enough gold
        if(this.game.player.gold >= 6){
            let points = {points: newTrickButtonPoints}
            this.tracePath(points,this.gameCtx)
            if(this.gameCtx.isPointInPath(mouseX,mouseY)){
                console.log("Clicked on Trick Button");
                this.game.player.activateNextTrick();
                this.game.player.gold -= 6;
                this.game.player.animate(this.gameCtx);
                this.buildTricksCards();
            }
        }
        // Eventually error handle not enough gold
        if(this.game.player.gold >= 2){
            let points = {points: newCardButtonPoints}
            this.tracePath(points,this.gameCtx)
            if(this.gameCtx.isPointInPath(mouseX,mouseY)){
                console.log("Clicked on Card Button");
                this.game.drawPlayer();
                this.game.player.gold -= 2;
                this.game.player.animate(this.gameCtx);
                this.buildTricksCards();
            }
        }
        // New Round button
        //525,470,140,50
        const newScoreRoundButton = [[(500/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1]],[140*this.scaler,50*this.scaler]];
        const newScoreRoundButtonPoints = Util.createPoints(newScoreRoundButton[0],newScoreRoundButton[1]);
        let points = {points: newScoreRoundButtonPoints}
        this.tracePath(points,this.gameCtx)
        if(this.gameCtx.isPointInPath(mouseX,mouseY) && this.game.round <= Game.MAXROUNDS){
            // console.log(this.game.round,"Round#");
            this.playRound();
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
        this.resetCardLinks();
        this.gameCtx.clearRect(0,0,this.canvasSize[0],this.canvasSize[1]) 
        this.game.animate(this.gameCtx);
        this.game.dealer.animate(this.gameCtx);
        this.game.player.animate(this.gameCtx);
        this.animateScores();
        this.buildTricksCards();
    }
    
    animateScores(){
        this.calcScaler();
        let scaler = this.scaler || 1; 
        this.gameCtx.font = `${40*scaler}px Arial`;
        this.gameCtx.fillStyle = "#FFFFFF";
        this.gameCtx.clearRect((250/1200)*this.canvasSize[0],0,300,(150/800)*this.canvasSize[1])
        this.gameCtx.onload = ()=> {
            this.calcScaler();
            this.gameCtx.font = `${40}px Arial`;
            this.gameCtx.clearRect((300/1200)*this.canvasSize[0],0,300,(150/800)*this.canvasSize[1])
            this.gameCtx.fillText(`Dealer Hands`,(300/1200)*this.canvasSize[0],(190/800)*this.canvasSize[1]);
        }
        this.gameCtx.fillText(`Dealer Hands`,(300/1200)*this.canvasSize[0],(190/800)*this.canvasSize[1]);

        //Draw Score Button
        this.gameCtx.font = `${24*scaler}px Arial Bold`;
        this.gameCtx.fillStyle = "#003399"
        this.gameCtx.fillRect((525/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],140*scaler,50*scaler)
        this.gameCtx.fillStyle = "#FFFFFF";
        this.gameCtx.fillText(`Score Round`,(535/1200)*this.canvasSize[0],(500/800)*this.canvasSize[1]);
        this.gameCtx.lineWidth = 3;
        this.gameCtx.strokeStyle = "#FFFFFF";
        this.gameCtx.strokeRect((525/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],140*scaler,50*scaler);
        //Player Score 
        this.gameCtx.fillStyle = "#003399"
        this.gameCtx.fillRect((285/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],180*scaler,50*scaler)
        this.gameCtx.fillStyle = "#FFFFFF";
        this.gameCtx.fillText(`Player Score: ${this.game.player.score}`,(295/1200)*this.canvasSize[0],(500/800)*this.canvasSize[1]);
        this.gameCtx.lineWidth = 3;
        this.gameCtx.strokeStyle = "#FFFFFF";
        this.gameCtx.strokeRect((285/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],180*scaler,50*scaler);
        //Dealer Score 
        this.gameCtx.fillStyle = "#003399"
        this.gameCtx.fillRect((735/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],180*scaler,50*scaler)
        this.gameCtx.fillStyle = "#FFFFFF";
        this.gameCtx.fillText(`Dealer Score: ${this.game.dealer.score}`,(742/1200)*this.canvasSize[0],(500/800)*this.canvasSize[1]);
        this.gameCtx.lineWidth = 3;
        this.gameCtx.strokeStyle = "#FFFFFF";
        this.gameCtx.strokeRect((735/1200)*this.canvasSize[0],(470/800)*this.canvasSize[1],180*scaler,50*scaler);

    }

    playRound(){
        this.game.nextRound();
        this.setupScreen();
        this.buildTricksCards();
        const roundscore = document.getElementById("roundscore");
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        roundscore.style.display = "flex";
    }


}

module.exports = ViewGame;