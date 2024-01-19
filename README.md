## Carnival Poker 

Carnival Poker is a multi-handed poker game played against a dealer. The game was inspired by the casino game Pai Gow and other multi-round video games. 
The player has multiple cards, hands and gold with the intent to beat the dealer over the course of 10 rounds. 

The application is built on vanilla JavaScript using canvas, vanilla Dom manipulation and CSS tricks for a seemless player experience. 

## Gameplay

Each round the player must attempt to build the best available poker hands from cards they have available and what the dealer is showing. 

The player can click on individual cards and move them between available hands. A hand can contain a maximum of 5 cards and a spot must be open to move cards.

After pressing the Score Round button in the middle of the screen, same color hand are compared, awarding one point to the victor for that hand. 

Additionally, 4 gold is given to the player to buy new cards or save up and unlock a new hand. 

The dealer is given random cards from the deck and contains logic to play at a high level. 

## Dealer Logic 

The dealer uses a variant of the concept of a greedy algorithm and recursion to distribute cards between its available hands.

With the given cards available, the dealer will attempt to build the best possible hand. Next, the dealer removes those cards from the pool and repeats;
recursively building the next best possible hand with the cards remaining. 

First, there is a CardTracker fuction which sorts the dealers hand by suit and number:

```javascript


updateCardTracker (cards = this.dealerCards, object = this.handTracker){
        object.cards = cards;
        let values = [...Array(15).keys()].splice(2,15)
        values.forEach((value) => {
            object[value] = [];
        });
        let suits = ["Clubs","Hearts","Diamond","Spades"];
        suits.forEach((suit)=>{
            object[suit] = [];
        })
        cards.forEach((card)=>{
            let suit = card.suit;
            let val = card.value;
            object[suit].push(card);
            object[val].push(card);
        })
    }

```

Now that the cards are sorted we can check for the best poker hands and store the cards needed to make those hands in an array:

```javascript
updateBestHand (object = this.handTracker){
        this.updateCardTracker(object.cards, object);
        if(object.cards.length <= 5 ){
            object.result.push(object.cards)
            return object
        }
        let flushCheck = [];
        let straightCheck = [];
        let fourKind = [];
        let threeKind = [];
        let twoKind = [];
```
Using sound logic I can use these arrays to find the best available poker hand, such as a three of a kind and a two of a kind for a Full house.
The cards used for this hand are removed and we repeat the function recursively. If at any point we have less than 5 cards, there is no optimizaion to be done.
Thankfully, this does not have to scale for very large n as there are only 52 cards in the deck. 

As a result, the dealer will attempt to play 1-2 strong hands and a final weaker hand with what is left over. 

There are additional optimizations which could be made with regard to straights or flushes, however I found the dealer represents a reasonable challenge as currently constructed.


