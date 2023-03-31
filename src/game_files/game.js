const Player = require("./player")
const Deck = require("./deck")

class Game {
    static START_HAND = 1
    static MAX_ROUNDS = 5
    constructor(){
        this.dealer = new Player({pos: [200,0]})
        this.player = new Player({pos: [200,0]})
        this.deck = new Deck();
        this.round = 0;
        this.prep_game();
    }
    prep_game(){
        for(let i = 0; i < Game.START_HAND; i++){
            this.drawPlayer();
        }
        for(let i = 0; i < Game.START_HAND; i++){
            this.drawDealer();
        }
        console.log(this.player.tricks[0],"starting hand");
        console.log(this.dealer.tricks[0],"starting hand");
    }

    drawPlayer(){
        let new_card = this.deck.drawCard();
        this.player.tricks[0].addCard(new_card);     
    }
    drawDealer(){
        let new_card = this.deck.drawCard();
        this.dealer.tricks[0].addCard(new_card);
    }

    nextRound(){
        this.round += 1;
        this.compareBoards();
        this.drawPlayer();
        this.drawDealer();
        console.log(this.player.score,"player score");
        console.log(this.dealer.score,"dealer score");
    }

    compareBoards(){
        // Will need refactor to compare for each trick
        // Loop based on whichever board has the most tricks
        // Include auto win if mismatch on trick count
        let player_value = 0;
        let dealer_value = 0;

                
        player_value += this.player.tricks[0].evaluate();
        dealer_value += this.dealer.tricks[0].evaluate();

        if(player_value>dealer_value){
            this.player.score += 1;
        }else{
            this.dealer.score += 1;
        }
        
    }

    resetBoard(){

    }

}
// const g = new Game();
// g.play();

module.exports = Game; 