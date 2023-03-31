const Trick = require("./trick")

class Player{
    static DIM_X = 800;
    static DIM_Y = 300;
    constructor(object){
  
        this.pos = object.pos;
        
        this.score = 0;
        this.gold = 0;
        this.color = "#00FF00";
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


    makeTricks(){
        let trickArray = [];
        let tempPos = this.pos;
        let trick1 = new Trick({pos: this.pos});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+400,this.pos[1]], color: "#FFFF00"});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: [this.pos[0],this.pos[1]+150], color: "#FF0000"});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+400,this.pos[1]+150], color: "#0000FF"});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }
    animate(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0],this.pos[1],Player.DIM_X,Player.DIM_Y)
        this.tricks.forEach((trick)=>{
            trick.animate(ctx);
        })
    }

    evaluateBoard(){
        let scores = [];
        for(let i = 0;i <this.tricks.length;i++){
            let trick = this.tricks[i]
            let sum = 0;
            for(let j = 0;j < trick.cards.length;j++){
                sum += trick.cards[j].value;
            }
            scores.push(sum);
        }
        return scores.sort();
    }

    
    makeDealerSet (){
        //This makes the dealer array
    }
}

module.exports = Player;