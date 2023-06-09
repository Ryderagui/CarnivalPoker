const Player = require("./player")
const Card = require("./card")
const Util = require("./util")

class Trick {
    static TRICKDIMENSIONS = [[233,90],[310,120],[388,150]]
    static canvasSize = Util.canvasSize().size;
    static WIDTH = this.canvasSize === "Large" ? this.TRICKDIMENSIONS[2][0] : this.canvasSize === "Medium" 
    ? this.TRICKDIMENSIONS[1][0] : this.TRICKDIMENSIONS[0][0];
    static HEIGHT = this.canvasSize === "Large" ? this.TRICKDIMENSIONS[2][1] : this.canvasSize === "Medium" 
    ? this.TRICKDIMENSIONS[1][1] : this.TRICKDIMENSIONS[0][1];
    static YBUFFER = this.HEIGHT*0.09;
    static XBUFFER = this.HEIGHT*0.09;
    static MAXCARDS = 5;
    constructor(object){
        this.pos = object.pos;
        this.cards = [];
        this.value = 0;
        this.values = [];
        this.trait = "High Card";
        this.major = 0;
        this.color = object.color;
        this.trickid = object.trickid;
        this.active = object.active;
        this.points = [];
        this.updatePoints();
        this.scaler = 1;
        this.calcScaler();
    }

    calcScaler(){
        if(this.canvasSize === "Small"){
            return this.scaler = 0.75;
        }else if(this.canvasSize === "Large"){
            return this.scaler = 1.25;
        }
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

    evaluatePoker(){
        let sorted = Util.sortCards(this.cards);
        this.cards = sorted;
        this.value = 0;
        this.major = 0;
        let values = [];
        this.trait = "High Card";
        let traitList = ["High Card","One Pair","Two Pair","Three of a Kind",
        "Straight","Flush","Full House","Four of a Kind","Straight-Flush"];
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        let base = 14;
        for(let i = 0;i<this.cards.length;i++){
            values.push(this.cards[i].value)
        }
        this.values = values;
        if(this.cards.length === 5){
            // Check flush
            let flushCheck = false;
            let straightCheck = true;
            for(let i = 0;i<suits.length;i++){
                let suit = suits[i];
                if(this.cards.every((card)=>card.suit === suit)){
                    flushCheck = true;
                }
            }
            // Check straight
            for(let i = 0;i<(values.length-1);i++){
                if(values[i] !== values[i+1]+1){
                    // console.log(values,"straigh check");
                    // console.log([values[i],values[i+1]],"straight check");
                    straightCheck = false;
                }
            }
            if(flushCheck && straightCheck){
                this.trait = "Straight-Flush";
            }else if(flushCheck){
                this.trait = "Flush"
            }else if(straightCheck){
                this.trait = "Straight"
            }
        }
        let hash = {};
        for(let i = 0;i<values.length;i++){
            if(hash[values[i]] === undefined){
                hash[values[i]] = 1;
            }else{
                hash[values[i]] += 1;
            }
        }
        let pair = false;
        let trips = false;
        for(let i = 0;i<values.length;i++){
             if(hash[values[i]]===4){
                this.trait = "Four of a Kind";
                this.major = values[i];
             }
             if(hash[values[i]]===2 && pair === false){
                pair = true;
                this.trait = "One Pair"
                this.major = values[i];
             }else if(hash[values[i]]===2 && pair === true && values[i] !== values[i-1]){
                this.trait = "Two Pair"
                this.major = values[i]>this.major ? values[i] : this.major;
             }else if(hash[values[i]]===3){
                trips = true;
                this.trait = "Three of a Kind"
                this.major = values[i];
            }
        }
        if(trips && pair){
            this.trait = "Full House"
        }
        this.major = this.major || values[0];
        let rank = traitList.indexOf(this.trait)+1;
        let tiebreaks = values.filter((num)=> num !== this.major);
        let majorSum = this.major*(base**rank)*2;
        let tiebreakSum = 0;
        for(let i = 1;i<tiebreaks.length+1;i++){
                tiebreakSum += tiebreaks[i-1]*(base**rank)/(base**i);
        }
        this.value = majorSum + tiebreakSum;
        return this.value;
    }

    removeCard(card) {
        let index = this.cards.indexOf(card);
        return this.cards.splice(index,1)[0];
    }

    addCard(card){
        // Need to refactor this to check if the trick has 5 cards
        let count = this.cards.length;
        if(count < Trick.MAXCARDS && this.active){
            let pos = this.pos;
            pos = [pos[0]+Trick.XBUFFER,pos[1]+Trick.YBUFFER]
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


    animate(ctx,name){
        let fontArray = [16,22,30];
        const fontSize = Trick.canvasSize === "Small" ? fontArray[0] : Trick.canvasSize === "Large" ? fontArray[2] : fontArray[1]
        if(this.active){
        const trickobj = document.getElementById(`trick${this.trickid}`)
        trickobj.style.display = "flex";
        trickobj.style.backgroundColor = this.color;
        let sorted = Util.sortCards(this.cards);
        this.cards = sorted;
        this.updateCards();
        this.evaluatePoker();
        ctx.fillStyle = this.color
        let trickX = this.pos[0];
        let trickY = this.pos[1];
        ctx.fillRect(trickX,trickY,Trick.WIDTH,Trick.HEIGHT)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `${fontSize}px Arial`;
        ctx.fillText(`${this.trait}`,trickX+Trick.WIDTH*0.33,trickY+Trick.HEIGHT*0.95)
        for(let i = 0;i<this.cards.length;i++){
            let currentCard = this.cards[i];
            currentCard.animate(ctx,currentCard.pos);
            let cardobj = document.getElementById(`${this.trickid}-${i}`)
            cardobj.src = currentCard.sprite.src
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(this.pos[0],this.pos[1],Trick.WIDTH,Trick.HEIGHT);
        }else{
        ctx.fillStyle = this.color
        let trickX = this.pos[0];
        let trickY = this.pos[1];
        ctx.fillRect(trickX,trickY,Trick.WIDTH,Trick.HEIGHT)
        ctx.fillStyle = "#FFFFFF"
        ctx.font = `${fontSize}px Arial`;
        if(name === "Player"){
        ctx.fillText(`Unlock Hand: 6 Gold!`,trickX+Trick.WIDTH*0.2*this.scaler,trickY+Trick.HEIGHT*0.5)
        }else{
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(`Inactive Hand`,trickX+Trick.WIDTH*0.3*this.scaler,trickY+Trick.HEIGHT*0.5)    
        }
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#FFFFFF";
        ctx.strokeRect(this.pos[0],this.pos[1],Trick.WIDTH,Trick.HEIGHT);
        }
    }
}


// let t = new Trick({pos: [0,0]});
// t.addCard("A");
// console.log(t,"t");


module.exports = Trick; 