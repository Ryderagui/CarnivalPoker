const Player = require("./player")
const Card = require("./card")
const Util = require("./util")

class Trick {
    static WIDTH = 400;
    static HEIGHT = 150;
    static YBUFFER = 20;
    static XBUFFER = 55;
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
            x: this.pos[0]+Trick.WIDTH,
            y: this.pos[1]
        },{
            x: this.pos[0]+Trick.WIDTH,
            y: this.pos[1]+Trick.HEIGHT
        },{
            x: this.pos[0],
            y: this.pos[1]+Trick.HEIGHT
        }
    ];
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
            pos = [pos[0]+Trick.XBUFFER,pos[1]+Trick.YBUFFER]
            let xshift = i*Card.CARDWIDTH+i*3;
            pos = [pos[0]+xshift,pos[1]];
            card.pos = pos;
            card.updatePoints();
        }
    }


    animate(ctx){
        let sorted = Util.sortCards(this.cards);
        this.cards = sorted;
        this.updateCards();
        ctx.fillStyle = this.color;
        let trickX = this.pos[0];
        let trickY = this.pos[1];
        ctx.fillRect(trickX,trickY,400,150)
        for(let i = 0;i<this.cards.length;i++){
            let currentCard = this.cards[i];
            console.log(currentCard,"card to be drawn");
            currentCard.animate(ctx,currentCard.pos);
        }
    }
}

// let t = new Trick({pos: [0,0]});
// t.addCard("A");
// console.log(t,"t");


module.exports = Trick; 