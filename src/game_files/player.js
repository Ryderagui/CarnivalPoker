class Player {

    constructor(object){
        this.score = 0;
        this.gold = 0;
        this.board = object.board;
        // Dealer likely has a 2D array of precontructed tricks
        this.dealer_array = [];
    }
    


    makeDealerSet (){
        //This makes the dealer array
    }
}

module.exports = Player;