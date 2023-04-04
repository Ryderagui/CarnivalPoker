const Trick = require("./trick")

class Player{
    static DIM_X = 800;
    static DIM_Y = 300;
    constructor(object){
  
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
        let trick1 = new Trick({pos: this.pos, trickid: 1, active: true});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+400,this.pos[1]], color: "#00FF00", trickid: 2, active: true});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: [this.pos[0],this.pos[1]+150], color: "#FF0000", trickid: 3, active: false});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+400,this.pos[1]+150], color: "#0000FF", trickid: 4, active: false});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }
    animate(ctx){
        ctx.clearRect(0,0,Player.DIM_X+400,Player.DIM_Y)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0],this.pos[1],Player.DIM_X,Player.DIM_Y)
        this.tricks.forEach((trick)=>{
            trick.animate(ctx);
        })
        ctx.font = "50px Arial";
        ctx.fillStyle = this.color;
        ctx.fillText(`${this.name}`,40,100);
        ctx.fillText(`${this.score}`,90,150);
        this.animateGold(ctx);
    }

    evaluateBoard(){
        let scores = [];
        for(let i = 0;i <this.tricks.length;i++){
            let trick = this.tricks[i];
            let sum = trick.evaluatePoker();
            for(let j = 0;j < trick.cards.length;j++){
                sum += trick.cards[j].value;
            }
            scores.push(sum);
        }
        return scores.sort();
    }

    animateGold(ctx){
        // Might move this to the game class
        if(this.name ==="Player"){
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`Gold ${this.gold}`,1030,60);
        // Button for new card
        const cardback = new Image();
        cardback.src = "images/Cards/Medium/BackRed1.png"
        ctx.drawImage(cardback,1020,200,55,80);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`New Card`,1090,240);
        ctx.fillText(`2`,1125,265);
        /// Five in a row for the new hand
        ctx.drawImage(cardback,1020,100,55,80);
        ctx.drawImage(cardback,1026,100,55,80);
        ctx.drawImage(cardback,1032,100,55,80);
        ctx.drawImage(cardback,1038,100,55,80);
        ctx.drawImage(cardback,1044,100,55,80);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(`New Trick`,1110,140);
        ctx.fillText(`6`,1145,160);
        //This is a box 1020 to 1100 or 80 by 80
        //The points are [1020,100],[1100,100],[1020,180],[1100,180]
        cardback.onload = ()=> {
            ctx.drawImage(cardback,1020,200,55,80);
            ctx.drawImage(cardback,1020,100,55,80);
            ctx.drawImage(cardback,1026,100,55,80);
            ctx.drawImage(cardback,1032,100,55,80);
            ctx.drawImage(cardback,1038,100,55,80);
            ctx.drawImage(cardback,1044,100,55,80);
        }
        
        
    }}
}

module.exports = Player;