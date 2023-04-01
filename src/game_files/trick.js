const Player = require("./player")
const Card = require("./card")


class Trick {
    static TRICKWIDTH = 400;
    static TRICKHEIGHT = 150;
    constructor(object){
        this.pos = object.pos;
        this.cards = [];
        this.value = 0;
        this.trait = "";
        this.color = object.color;
        this.trickid = object.trickid;
        this.points = [];
        this.updatePoints();
    }

    updatePoints(pos){
        this.pos = pos || this.pos;
        this.points =[{
            x: this.pos[0],
            y: this.pos[1]
        },{
            x: this.pos[0]+Trick.TRICKWIDTH,
            y: this.pos[1]
        },{
            x: this.pos[0]+Trick.TRICKWIDTH,
            y: this.pos[1]+Trick.TRICKHEIGHT
        },{
            x: this.pos[0],
            y: this.pos[1]+Trick.TRICKHEIGHT
        }
    ];
    }

    sortCards(array){
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
        let pivot = array[0];
        if(array.length < 2) return this;
        let left = this.slice(1).filter((ele) => sorter(ele,pivot) === -1);
        let right = this.slice(1).filter((ele) => sorter(ele,pivot) === 1);
        let leftSorted = this.sortCards(left);
        let rightSorted = this.sortCards(right);
        return leftSorted.concat([pivot]).concat(rightSorted);
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
        let count = this.cards.length;
        if(count < 5){
            let pos = this.pos 
            let buffer = 35;
            let xbuffer = 20;
            pos = [pos[0]+buffer+xbuffer,pos[1]+buffer]
            let xshift = count*Card.CARDWIDTH + count*3;
            pos = [pos[0]+xshift,pos[1]];
            card.pos = pos;
            card.trickid = this.trickid;
            card.updatePoints();
            this.cards.push(card);
            this.cards = this.sortCards(this.cards);
            return true;
        }
        else{
            return false;
        }
    }

    updateCards(){
        let count = this.cards.length;
        for(let i = 0;i<count;i++){
            let card = this.cards[i];
            let pos = this.pos 
            let buffer = 35;
            let xbuffer = 20;
            pos = [pos[0]+buffer+xbuffer,pos[1]+buffer]
            let xshift = i*Card.CARDWIDTH+i*3;
            pos = [pos[0]+xshift,pos[1]];
            card.pos = pos;
            card.updatePoints();
        }
        this.cards = this.sortCards(this.cards);
    }


    animate(ctx){
        ctx.fillStyle = this.color;
        let trickX = this.pos[0];
        let trickY = this.pos[1];
        ctx.fillRect(trickX,trickY,400,150)
        for(let i = 0;i<this.cards.length;i++){
            let currentCard = this.cards[i];
            currentCard.animate(ctx,currentCard.pos);
        }
    }
}

// let t = new Trick({pos: [0,0]});
// t.addCard("A");
// console.log(t,"t");


module.exports = Trick; 