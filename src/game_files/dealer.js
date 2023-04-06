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
        let trick1 = new Trick({pos: [this.pos[0],this.pos[1]+Trick.HEIGHT], trickid: 5, active: true});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]+Trick.HEIGHT], color: "#00CC33", trickid: 6, active: true});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: this.pos, color: "#800080", trickid: 7, active: true});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]], color: "#0099FF", trickid: 8, active: true});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }



    makeDealerSet (){
        //This makes the dealer array
        //This.tricks
        //Dealer set is an array of tricks.

        
    }

    newTrickSet (){
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