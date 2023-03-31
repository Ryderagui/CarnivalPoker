class Card {
    constructor(object) {
        //#2-14
        this.value = object.value;
        // Suit needs to match the card save: Clubs, Diamond, Hearts, Spades
        this.suit = object.suit;
        // Code this in once ready to draw
        // this.sprite = new Image();
        // this.sprite.src = "images/Cards/Medium/"+this.suit.toUpperCase+this.value+".png";
        this.selected = false;
        //Might need to know what trick we are inside, for event handling
        this.trick = object.trick;
        
    }
    animate(){

    }
}

module.exports = Card; 