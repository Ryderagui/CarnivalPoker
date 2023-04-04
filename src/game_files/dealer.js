const Trick = require("./trick")
const Player = require("./player")

class Dealer extends Player{

    constructor(object){
        super(object);
        this.dealerSet = [];
        this.makeTricks();
        this.makeDealerSet();
    }
    addCardBoard(card){
        for(let i = 0;i <this.tricks.length;i++){
            if(this.tricks[i].active && this.tricks[i].addCard(card)){
                return true;
            }else if(!this.tricks[i].active){
                this.activateNextTrick();
                this.addCardBoard(card);
                break;
            }
        }
        return false;
    }

    makeTricks(){
        let trickArray = [];
        let tempPos = this.pos;
        let trick1 = new Trick({pos: [this.pos[0],this.pos[1]+150], trickid: 1, active: true});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+400,this.pos[1]+150], color: "#00FF00", trickid: 2, active: true});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: this.pos, color: "#FF0000", trickid: 3, active: false});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+400,this.pos[1]], color: "#0000FF", trickid: 4, active: false});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }



    makeDealerSet (){
        //This makes the dealer array
        //This.tricks
        //Dealer set is an array of tricks.

        
    }

    newTrickSet (){
        // Makes 4 empty tricks of the appropriate colors and positions
        // Returns an array of these tricks. 
        let trickArray = [];
        let tempPos = this.pos;
        let trick1 = new Trick({pos: this.pos, trickid: 1});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+400,this.pos[1]], color: "#00FF00", trickid: 2});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: [this.pos[0],this.pos[1]+150], color: "#FF0000", trickid: 3});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+400,this.pos[1]+150], color: "#0000FF", trickid: 4});
        trickArray.push(trick4);
        return trickArray;
    }


    nextDealerCard(){

    }

}

module.exports = Dealer;