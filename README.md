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

With the given cards available, the dealer will attempt to build the best possible hand, remove those cards from the pool and repeat;
recursively building the next best possible hand with the cards remaining. 

There are additional optimizations which could be made with regard to straights or flushes, however I found the dealer represents a reasonable challenge as currently constructed.


