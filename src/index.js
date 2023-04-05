const Game = require("./game_files/game")
const ViewGame = require("./game_files/view_game")

//Questions:
// Ask about event handelers and what should own them
// 

const dealerCanvas = document.getElementById("dealer");
const playerCanvas = document.getElementById("player");
const dealerCtx = dealerCanvas.getContext("2d");
const playerCtx = playerCanvas.getContext("2d");
const game = new Game ();
const dealerCanvasRect = dealerCanvas.getBoundingClientRect();
const gamepos = [dealerCanvasRect.x,dealerCanvasRect.y];
const view = new ViewGame(game,dealerCtx,playerCtx,gamepos);
const overlay = document.getElementById("overlay");
const start = document.getElementById("start");
const startbutton = document.getElementById("start-button");
const roundscore = document.getElementById("roundscore");
const continuebutton = document.getElementById("continuebutton");

console.log(gamepos,"Game Pos")


startbutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    start.style.display = "none";
})

continuebutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    roundscore.style.display = "none";
})


window.game = game;
window.view = view;
