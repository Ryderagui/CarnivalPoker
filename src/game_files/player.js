const Trick = require("./trick")

class Player{
    static DIM_X = 800;
    static DIM_Y = 300;
    constructor(object){
        const trick = new Trick({pos: this.pos});
        this.tricks = [trick];
        this.pos = object.pos;
        //Probably want an array of trick pos.
        //Probably want to prefill each board with 4 tricks, 3 of which are empty.
        this.score = 0;
        this.gold = 0;
    }

    animate(){

    }

    
    makeDealerSet (){
        //This makes the dealer array
    }
}

module.exports = Player;