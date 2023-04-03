const Player = require("./player")
const Deck = require("./deck")
const Util = require("./util")

class Game {
    static START_HAND = 7;
    static MAXROUNDS = 10;
    constructor(){
        this.dealer = new Player({pos: [200,0], name: "Dealer", color:"#800080"})
        this.player = new Player({pos: [200,0], name: "Player", color:"#FFA500"})
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
        // console.log(this.player.tricks[0],"starting hand");
        // console.log(this.dealer.tricks[0],"starting hand");
        // this.dealer.tricks[2].active = false;
        // this.dealer.tricks[3].active = false;
        // this.player.tricks[2].active = false;
        // this.player.tricks[3].active = false;
    }

    drawPlayer(){
        let new_card = this.deck.drawCard();
        this.player.addCardBoard(new_card);     
    }
    drawDealer(){
        let new_card = this.deck.drawCard();
        this.dealer.addCardBoard(new_card);
    }

    nextRound(){
        this.round += 1;
        this.player.gold += 3;
        this.compareBoards();
        this.drawDealer();
        console.log(this.player.score,"player score");
        console.log(this.dealer.score,"dealer score");
    }

    compareBoards(){
        // Will need refactor to compare for each trick
        // Loop based on whichever board has the most tricks
        // Include auto win if mismatch on trick count

        let dealer_scores = this.dealer.evaluateBoard();  
        console.log(dealer_scores,"Dealer Scores")
        let player_scores = this.player.evaluateBoard();
        console.log(player_scores,"Player Scores")
        let min = dealer_scores.length < player_scores.length ? dealer_scores.length : player_scores.length;
        console.log(min,"min");
        for(let i = 0;i<min;i++){
            if(dealer_scores[i]>player_scores[i]){
                this.dealer.score += 1
            }else if(dealer_scores[i]<player_scores[i]){
                this.player.score += 1
            }
        }
        
    }

    resetBoard(){

    }

}
// const g = new Game();
// g.play();

module.exports = Game; 