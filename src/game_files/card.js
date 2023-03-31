class Card {
    static CARDWIDTH = 55;
    static CARDHEIGHT = 80;
    constructor(object) {
        
        //#2-14
        this.value = object.value;
        // Suit needs to match the card save: Clubs, Diamond, Hearts, Spades
        this.suit = object.suit;
        // Code this in once ready to draw
        this.sprite = new Image();
        this.sprite.src = "images/Cards/Medium/"+this.suit+this.value+".png";
        console.log(this.sprite.src,"Card Src");
        this.selected = false;
        //Might need to know what trick we are inside, for event handling
        this.trick = object.trick;
        
    }
    animate(ctx,spot){
        console.log("Trying to draw","Card Animate")
        ctx.drawImage(this.sprite,spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT)
        this.sprite.onload = ()=> {    
            ctx.drawImage(this.sprite,spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT)
        };
    }
}

module.exports = Card; 