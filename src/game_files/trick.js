const Player = require("./player")
const Card = require("./card")


class Trick {
    constructor(object){
        this.pos = object.pos;
        this.cards = [];
        this.value = 0;
        this.trait = "";
        this.color = object.color;
    }

    sortCards(){
        function sorter(card1,card2){
            //Return 1 if card 1 > card 2
            //Return -1 if card 1 < card 2
            suits = ["Spades","Hearts","Diamond","Clubs"]
            if(card1.value>card2.value){
                return 1
            }else if(card1.value<card2.value){
                return -1 
            }else{
                if(suits.indexOf(card1.suit)<suits.indexOf(card2.suit)){
                    return 1
                }else{
                    return -1 
                }
            }
        }
    }

    evaluate() {
        let sum = 0;
        this.cards.forEach((card)=>{
            sum += card.value;
        })
        return sum; 
    }

    removeCard(card) {
        let index = this.cards.indexOf(card);
        return this.cards.splice(index,1)[0];
    }

    addCard(card){
        // Need to refactor this to check if the trick has 5 cards
        if(this.cards.length < 5){
            this.cards.push(card);
            return true;
        }
        else{
            return false;
        }
    }

    animate(ctx){
        ctx.fillStyle = this.color;
        let trickX = this.pos[0];
        let trickY = this.pos[1];
        ctx.fillRect(trickX,trickY,400,150)
        let buffer = 5;
        let cardX = trickX + buffer;
        let cardY = trickY + buffer;
        for(let i = 0;i<this.cards.length;i++){
            let spot = [cardX,cardY];
            this.cards[i].animate(ctx,spot);
            cardX += Card.CARDWIDTH;
        }
    }
}

// let t = new Trick({pos: [0,0]});
// t.addCard("A");
// console.log(t,"t");


module.exports = Trick; 