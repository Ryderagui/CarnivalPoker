const Game = require("./game_files/game")
const ViewGame = require("./game_files/view_game")

//Questions:
// Ask about event handelers and what should own them
// 

const dealercanvas = document.getElementById("dealer");
const playercanvas = document.getElementById("player");
const dealerCtx = dealercanvas.getContext("2d");
const playerCtx = playercanvas.getContext("2d");
const game = new Game ();
const view = new ViewGame(game,dealerCtx,playerCtx);

setInterval(view.playRound.bind(view),5000);