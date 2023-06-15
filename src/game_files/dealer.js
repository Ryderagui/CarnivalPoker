const Trick = require("./trick")
const Player = require("./player")
const Util = require("./util")
class Dealer extends Player{

    constructor(object){
        super(object);
        this.dealerCards = [];
        this.handTracker = {result: []};
        this.makeTricks();
    }
    addCardBoard(card){
        for(let i = 0;i <this.tricks.length;i++){
            if(this.tricks[i].active && this.tricks[i].addCard(card)){
                break;
            }else if(!this.tricks[i].active){
                this.activateNextTrick();
                this.addCardBoard(card);
                break;
            }
        }
        this.dealerPlayCycle();
        return true;
    }

    makeTricks(){
        let trickArray = [];
        let trick1 = new Trick({pos: [this.pos[0],this.pos[1]+Trick.HEIGHT],color: "#FFA500", trickid: 5, active: true});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]+Trick.HEIGHT], color: "#00CC33", trickid: 6, active: true});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: this.pos, color: "#800080", trickid: 7, active: false});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+Trick.WIDTH,this.pos[1]], color: "#0099FF", trickid: 8, active: false});
        trickArray.push(trick4);
        this.tricks = trickArray;
    }
    updateDealerCards (){
        let newDealerCards = [];
        this.tricks.forEach((trick)=>{
            let array = [...trick.cards];
            newDealerCards = [...newDealerCards, ...array];
        })
        this.dealerCards = newDealerCards;
    }


    updateCardTracker (cards = this.dealerCards, object = this.handTracker){
        object.cards = cards;
        let values = [...Array(15).keys()].splice(2,15)
        values.forEach((value) => {
            object[value] = [];
        });
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        suits.forEach((suit)=>{
            object[suit] = [];
        })
        cards.forEach((card)=>{
            let suit = card.suit;
            let val = card.value;
            object[suit].push(card);
            object[val].push(card);
        })
    }

    updateBestHand (object = this.handTracker){
        this.updateCardTracker(object.cards, object);
        if(object.cards.length <= 5 ){
            object.result.push(object.cards)
            return object
        }
        let flushCheck = [];
        let straightCheck = [];
        let fourKind = [];
        let threeKind = [];
        let twoKind = [];
        // Check for flush
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        suits.forEach((suit)=>{
            if(object[suit].length>4){
                flushCheck = object[suit]; 
            }
        })
        
        // Check for straight
        let values = [...Array(15).keys()].splice(2,15);
        let chain = [];
        values.forEach((value)=>{
            if(object[value].length >= 4){
                fourKind.push(object[value]);
            } else if(object[value].length ===3){
                threeKind.push(object[value]);
            } else if (object[value].length === 2){
                twoKind.push(object[value]);
            }
            if(object[value][0]){
                chain.push(object[value][0])
                if(chain.length === 5){
                    straightCheck = chain;
                }
            } else {
                chain = [];
            }
        });
        //
        const cleanUpResult = () => {
            let copyObject = {...object};

            object.result.forEach((trick)=>{
                trick.forEach((card)=>{
                    object.cards.forEach((card2,idx)=>{
                       if(card.suit === card2.suit && card.value === card2.value){
                           object.cards = object.cards.slice(0,idx).concat(object.cards.slice(idx+1))
                       }
                    })
                })
            })
     
            return this.updateBestHand(object);
        }
        //Build Straight Flush
        // if(flushCheck.length !== 0 && straightCheck.length !== 0){
        //     let straightCards = straightCheck.filter((card)=>{
        //         card.suit === flushCheck[0].suit;
        //     })
        //     let result = [];
        //     for(let i = 0; i < 5; i++){
        //         result.push(straightCards[i]);
        //     }
        //     object.result.push(result);
        //     console.log("Found Straight Flush")
        //     return cleanUpResult();
        // }
        //Build Four of a Kind
        if(fourKind.length ){
            let result = [];
            for(let i = 0; i < 4; i++){
                result.push(fourKind[0][i]);
            }
            object.result.push(result);
            return cleanUpResult();
        }
        //Build Full House
        if(threeKind.length && twoKind.length){
            let result = [];
            for(let i = 0; i < 3; i++){
                result.push(threeKind[0][i]);
                if(i !== 2){
                    result.push(twoKind[0][i])
                }
            }
            object.result.push(result);
    
            return cleanUpResult();
        }
        //Build Flush
        if(flushCheck.length){
            let result = [];
            for(let i = 0; i < 5; i++){
                result.push(flushCheck[i]);
            }
            object.result.push(result);
           
            return cleanUpResult();
        }
        // Build Straight
        if(straightCheck.length){
            let result = [];
            for(let i = 0; i < 5; i++){
                result.push(straightCheck[i]);
            }
            object.result.push(result);
           
            return cleanUpResult();
        }
        // Build three of a Kind
        if(threeKind.length){
            let result = [];
            for(let i = 0; i < 3; i++){
                result.push(threeKind[0][i]);
            }
            object.result.push(result);
        
            return cleanUpResult();
        }
        // Build two of a Kind
        if(twoKind.length){
            if(twoKind.length > 1){
                let result = [];
                for(let i = 0; i < 2; i++){
                    result.push(twoKind[0][i]);
                    result.push(twoKind[1][i]);
                }
               
                object.result.push(result);
                return cleanUpResult();
            }
            let result = [];
            for(let i = 0; i < 2; i++){
                result.push(twoKind[0][i]);
            }
         
            object.result.push(result);
            return cleanUpResult();
        }
        let result = [];
        for(let i = 0; i < 5; i++){
            result.push(object.cards[i]);
        }
    
        object.result.push(result);
   
        return cleanUpResult();        
    }

    dealerPlayCycle () {
        this.updateDealerCards();
        this.updateCardTracker();
        if(this.dealerCards.length >= 5){
            this.handTracker.result = [];
            this.updateBestHand();
         
        };
        if(this.activeTricks === this.handTracker.result.length){
            //Easy Case
            this.handTracker.result.forEach((newTrick,idx)=>{
                this.tricks[idx].cards = []; 
                newTrick.forEach((card)=>{
                    this.tricks[idx].addCard(card)
                })
            })
        }else{
            if(this.handTracker.result.length > this.activeTricks){
                let flatResult = this.handTracker.result.flat();
                for(let i = 0; i < this.activeTricks; i++){
                    this.tricks[i].cards = [];
                    while((this.tricks[i].cards.length < 5) && (flatResult.length > 0)) {
                        this.tricks[i].addCard(flatResult.shift());
                    }
                }
            }        
        }
    }


    sumScores (scores) {
        let score = 0;
        scores.forEach((num)=>{
            score += num
        } );
        return score;
    }

    newTrickSet (){
        let trickArray = [];
        let tempPos = this.pos;
        let trick1 = new Trick({pos: this.pos, trickid: 1});
        trickArray.push(trick1);
        let trick2 = new Trick({pos: [this.pos[0]+400,this.pos[1]], color: "#00FF00", trickid: 2});
        trickArray.push(trick2);
        let trick3 = new Trick({pos: [this.pos[0],this.pos[1]+150], color: "#FF0000", trickid: 3, active: false});
        trickArray.push(trick3);
        let trick4 = new Trick({pos: [this.pos[0]+400,this.pos[1]+150], color: "#0000FF", trickid: 4, active: false});
        trickArray.push(trick4);
        return trickArray;
    }


    nextDealerCard(){

    }

}

module.exports = Dealer;