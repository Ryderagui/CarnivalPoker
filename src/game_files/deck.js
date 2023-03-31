const Card = require("./card")

class Deck {

        constructor(){
            this.cards = [];
            this.makeCards();
        }

    makeCards() {
        let allCards = [];
        let values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        
        for(let i = 0;i < values.length; i++){
            for(let j = 0; j < suits.length; j++){
                let cardObject = {
                    suit: suits[j],
                    value: values[i],
                }
                let card = new Card(cardObject);
                allCards.push(card);
            }
        }
        this.cards = allCards;
        return true;
    }

    drawCard() {
        const scaler = this.cards.length;
        const random = Math.random();
        const pick = Math.floor(scaler * random);
        const chosen = this.cards[pick];
        return this.cards.splice(this.cards.indexOf(chosen),1)[0];
    }
}

// let deck = new Deck();
// console.log(deck.cards.length);
// console.log(deck.drawCard());
// console.log(deck.cards.length);
module.exports = Deck;