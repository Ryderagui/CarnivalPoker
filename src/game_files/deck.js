class Deck {

        constructor(){
            this.cards = Deck.makeCards();
        }

    makeCards() {
        let allCards = [];
        let values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        
        for(let i = 0;i < nums.length; i++){
            for(let j = 0; j < suits.length; j++){
                let cardObject = {
                    suit: suits[j],
                    value: values[i],
                }
                let card = new Card(cardObject);
                allCards.push(card);
            }
        }

        return allCards;
    }

    drawCard() {
        const scaler = this.cards.length;
        const random = Math.random();
        const pick = scaler * random;

        return this.cards[pick];
    }
}


module.exports = Deck;