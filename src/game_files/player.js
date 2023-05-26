const Trick = require("./trick")
const Util = require("./util")


class Player{
    static DIM_X = Trick.WIDTH*2;
    static DIM_Y = Trick.HEIGHT*2;
    constructor(object){
        this.canvasSize = object.canvasSize;
        this.DIM_X = 
        this.pos = object.pos;
        this.name = object.name;
        this.score = 0;
        this.gold = 0;
        this.color = object.color;
        //Probably want an array of trick pos.
        //Probably want to prefill each board with 4 tricks, 3 of which are empty.
        this.tricks = [];
        this.makeTricks();
    }


    addCardBoard(card){
        for(let i = 0;i <this.tricks.length;i++){
            if(this.tricks[i].addCard(card)){
                return true;
            }
        }
        return false;
    }

    activateNextTrick(){
        for(let i = 0;i<this.tricks.length;i++){
            let trick = this.tricks[i];
            if(trick.active === false){
                trick.active = true;
                break;
            }
        }
    }


    makeTricks(){
        let trickArray = [];
        let tempPos = this.pos;
        let trick1 = new Trick({pos: this.pos, color: "#FFA500", trickid: 1, active: true});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]], color: "#00CC33", trickid: 2, active: true});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: [this.pos[0],this.pos[1]+Trick.HEIGHT], color: "#800080", trickid: 3, active: false});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]+Trick.HEIGHT], color: "#0099FF", trickid: 4, active: false});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }
    animate(ctx){
        // ctx.clearRect(0,0,900,200)
        ctx.fillStyle = this.color;
        this.tricks.forEach((trick)=>{
            trick.animate(ctx,this.name);
        })
        this.animateGold(ctx);
    }

    evaluateBoard(){
        let scores = [];
        for(let i = 0;i <this.tricks.length;i++){
            let trick = this.tricks[i];
            trick.evaluatePoker();
            let value = trick.value || 0;
            scores.push(value);
        }
        return scores;
    }

    animateGold(ctx){
        // Might move this to the game class
        if(this.name ==="Player"){
        //Dealer Score 
        ctx.fillStyle = "#003399"
        ctx.fillRect(980,370,130,260)
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(980,370,130,260);    
        ctx.font = "30px Arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`Gold: ${this.gold}`,995,400);
        // Button for new card
        const cardback = new Image();
        cardback.src = "images/Cards/Medium/BackRed1.png"
        ctx.drawImage(cardback,1020,405,55,80);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`New Card`,995,507);
        ctx.fillText(`2`,1090,507);
        /// Five in a row for the new hand
        ctx.drawImage(cardback,995,515,55,80);
        ctx.drawImage(cardback,1001,515,55,80);
        ctx.drawImage(cardback,1007,515,55,80);
        ctx.drawImage(cardback,1013,515,55,80);
        ctx.drawImage(cardback,1019,515,55,80);
        ctx.font = "20px Arial";
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`New Hand`,995,620);
        ctx.fillText(`6`,1092,620);
        //This is a box 1020 to 1100 or 80 by 80
        //The points are [1020,100],[1100,100],[1020,180],[1100,180]
        cardback.onload = ()=> {
            ctx.drawImage(cardback,1020,405,55,80);
            ctx.drawImage(cardback,995,515,55,80);
            ctx.drawImage(cardback,1001,515,55,80);
            ctx.drawImage(cardback,1007,515,55,80);
            ctx.drawImage(cardback,1013,515,55,80);
            ctx.drawImage(cardback,1019,515,55,80);
        }
        
        
    }}
}

module.exports = Player;