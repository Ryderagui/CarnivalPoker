const Trick = require("./trick")

class Board{
    static DIM_X = 800;
    static DIM_Y = 300;
    constructor(object){
        const trick = new Trick;
        this.tricks = [trick];
        this.pos = object.pos;
        //Probably want an array of trick pos.
        //Probably want to prefill each board with 4 tricks, 3 of which are empty.
        
    }

    animate(){

    }
}

module.exports = Board;