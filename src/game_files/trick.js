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
        let count = this.cards.length;
        if(count < 5){
            let pos = this.pos 
            let buffer = 20;
            pos = [pos[0]+buffer,pos[1]+buffer]
            let xshift = count*Card.CARDWIDTH;
            pos = [pos[0]+xshift,pos[1]];
            card.pos = pos;
            card.trickid = this.trickid;
            card.updatePoints();
            this.cards.push(card);
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
            let buffer = 20;
            pos = [pos[0]+buffer,pos[1]+buffer]
            let xshift = i*Card.CARDWIDTH;
            pos = [pos[0]+xshift,pos[1]];
            card.pos = pos;
            card.updatePoints();
        }
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