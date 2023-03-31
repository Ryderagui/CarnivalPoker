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
        const trick = new Trick({pos: this.pos});
        this.tricks = [trick];
    }

    animate(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos[0],this.pos[1],Player.DIM_X,Player.DIM_Y)
        this.tricks.forEach((trick)=>{
            trick.animate(ctx);
        })
    }

    
    makeDealerSet (){
        //This makes the dealer array
    }
}

module.exports = Player;