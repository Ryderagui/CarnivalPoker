Carnival Poker 

The player is playing modified poker against a dealer where both the player and dealer have multiple poker tricks to manage.
The dealer will present their board ahead of each round, allowing the player to decide how to rearrange the cards in their tricks to maximize their score. 
During the round, the player can use their chips to buy new cards or an entire new trick location.
At the end of the round, the player's best trick is compared to the dealer's best trick and so forth, assigning points for each trick won. 
After 10 rounds, the game ends and the scores are compared, does the House always win?

Technology:
Canvas API to display the game board
Webpack and Babel


Features:
(Bare bones)
Player has a board of poker cards.
The Dealer has a trick of poker cards.
The poker cards are displayed in the correct order left to right on each board.
Each round, the two sets of cards are compared.
A score is assigned to each player and tallied. 
Each round, a new random card is given to the player. The dealers board is updated with the pre-assigned value. 
After 5 rounds, the game ends and scores are compared to find a winner. 
(Basic)
The player and dealer begin with two poker trick spots. The player can move cards between tricks on the board by clicking; with a max of 5 cards per trick. 
Player and Dealer start with 6 cards each. Play continues as before.
(Next step)
The player and dealer are given a 3rd trick after 5 rounds and a 4th trick after 10 rounds. The game should manage up to these total 4 tricks on both boards.

The basic game is now complete.

Poker trick rankings will be included on the right side of the screen.

Round 0 can be added as a tutorial round. 

(Advanced) 
The player is given gold, a resource. The player can click buttons to buy new random cards or save and buy a new trick spot. The max trick spots is 4. 
Each round the player is given gold, which can accumulate. 
The game is played for 10 rounds. 

(Advanced - Card Draft)
When a random card is chosen, a pop-up appears to allow the player to choose 1 of 3 cards to add to their board. 

(Extra Advanced - Animation)
Each round a pop-up appears on the screen, with the players tricks in a column on the left and dealers tricks on the right. There is the poker name for thetrick under each one, a brief clash plays and a point is awarded to the appropriate player, on the left. After each trick clash, the points sum and the pop-up goes away. 

(Extra Advanced - Art Flare)
Add a start screen with a carnival flare and style the background, buttons and game pieces to have fun colorful carnival atmosphere. 

(Extra Advanced - Dealer Difficulty)
Add an option to increase or decrease the difficulty of the dealers pre-set boards. 

Nice to have section:
Some avatar or face or otherwise artistic representation for the dealer on the screen.

Music and a music mute button. Changing to be more hype in later rounds.

Timeline: 

Thursday- Get Canvas working and re-familiarize myself with how canvas works with image assets.
Friday- Get Board Class, Card Classes built. Get first the cards on the screen. Begin game logic.
Monday- Finish all game logic, including handling multiple tricks and Poker hand rankings. Start handling multiple tricks on board. 
Tuesday- Get multiple tricks onto the board. Add click funtionality let the player move cards from one trick to another. Finalize base game.
Wednesday- Add Start Page. Add any additional features. 
Thursday- Deploy
