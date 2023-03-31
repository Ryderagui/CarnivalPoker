


class Trick {
    constructor(object){
        this.pos = object.pos;
        this.cards = [];
        this.value = 0;
        this.trait = "";
    }

    sort(){

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
        this.cards.push(card);
        return true 
    }

    animate(){

    }
}

module.exports = Trick; 