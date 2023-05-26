const Player = require("./player")
const Deck = require("./deck")
const Util = require("./util")
const Dealer = require("./dealer")

class Game {
    static START_HAND = 7;
    static MAXROUNDS = 10;
    //default is 1200,800
    // 800 - 2*120 (Trick) = 560

    constructor(canvasSize){
        this.dealer = new Dealer({pos: [canvasSize[1]*0.24,canvasSize[1]*0.25], name: "Dealer", color:"#FFA500",canvasSize: canvasSize})
        this.player = new Player({pos: [canvasSize[1]*0.24,canvasSize[1]*0.7], name: "Player", color:"#FFA500",canvasSize: canvasSize})
        this.deck = new Deck();
        this.canvasSize = canvasSize;
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
        // console.log(this.player.score,"player score");
        // console.log(this.dealer.score,"dealer score");
    }

    compareBoards(){
        // Will need refactor to compare for each trick
        // Loop based on whichever board has the most tricks
        // Include auto win if mismatch on trick count

        let dealer_scores = this.dealer.evaluateBoard();  
        // console.log(dealer_scores,"Dealer Scores")
        let player_scores = this.player.evaluateBoard();
        // console.log(player_scores,"Player Scores")
        let min = dealer_scores.length < player_scores.length ? dealer_scores.length : player_scores.length;
        // console.log(min,"min");
        let playerroundscore = 0;
        let dealerroundscore = 0;
        for(let i = 0;i<min;i++){
            if(dealer_scores[i]>player_scores[i]){
                let scoreobj = document.getElementById(`score${i+1}`)
                scoreobj.innerText = 0;
                dealerroundscore += 1;
                // console.log("Dealer Wins 1")
            }else if(dealer_scores[i]<player_scores[i]){
                let scoreobj = document.getElementById(`score${i+1}`)
                scoreobj.innerText = 1;
                playerroundscore += 1;
                // console.log("Player Wins 1")
            }else if(dealer_scores[i] === player_scores[i]){
                // console.log("Tie");
                let scoreobj = document.getElementById(`score${i+1}`)
                scoreobj.innerText = "";
            }
        }
        this.player.score += playerroundscore;
        this.dealer.score += dealerroundscore;
        // console.log([this.player.score,this.dealer.score],"Score after round");
        let playerscorehtml = document.getElementById(`playerscore`)
        let dealerscorehtml = document.getElementById(`dealerscore`)
        playerscorehtml.innerText = `Round Score     ${playerroundscore}`
        dealerscorehtml.innerText = `Round Score     ${dealerroundscore}`
    }

    resetBoard(){

    }

    winner(){
        let playerscore = this.player.score;
        let dealerscore = this.dealer.score;
        let result = [playerscore,dealerscore];
        if(playerscore > dealerscore){
            result.push("Player Wins!");
        }else{
            result.push("Dealer Wins!");
        }
        return result;
    }

}
// const g = new Game();
// g.play();

module.exports = Game; 