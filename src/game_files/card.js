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
        // console.log(this.sprite.src,"Card Src");
        this.selected = false;
        //Might need to know what trick we are inside, for event handling
        this.trickid = 0;
        this.pos = [0,0];
        this.points =[];
    }
    animate(ctx,spot){
        ctx.drawImage(this.sprite,spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT)
        if(this.selected){
        ctx.lineWidth = 3;;
        ctx.strokeStyle = "#FFFF00";
        ctx.strokeRect(spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT);
        }
        this.sprite.onload = ()=> {   
            ctx.drawImage(this.sprite,spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT);
            if(this.selected){
                ctx.lineWidth = 3;;
                ctx.strokeStyle = "#FFFF00";
                ctx.strokeRect(spot[0],spot[1],Card.CARDWIDTH,Card.CARDHEIGHT);
            }
        };

    }
    updatePoints(pos){
        this.pos = pos || this.pos;
        this.points =[{
            x: this.pos[0],
            y: this.pos[1]
        },{
            x: this.pos[0]+Card.CARDWIDTH,
            y: this.pos[1]
        },{
            x: this.pos[0]+Card.CARDWIDTH,
            y: this.pos[1]+Card.CARDHEIGHT
        },{
            x: this.pos[0],
            y: this.pos[1]+Card.CARDHEIGHT
        }
    ];
    }
}

module.exports = Card; 