const Game = require("./game_files/game")
const ViewGame = require("./game_files/view_game")

//Questions:
// Ask about event handelers and what should own them
// 

const gameCanvas = document.getElementById("canvas");
const gameCtx = gameCanvas.getContext("2d");
const game = new Game ();
const gameCanvasRect = gameCanvas.getBoundingClientRect();
const gamepos = [gameCanvasRect.x,gameCanvasRect.y];
const view = new ViewGame(game,gameCtx,gamepos);
const overlay = document.getElementById("overlay");
const start = document.getElementById("start");
const startbutton = document.getElementById("start-button");
const roundscore = document.getElementById("roundscore");
const continuebutton = document.getElementById("continuebutton");

startbutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    start.style.display = "none";
})

continuebutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    roundscore.style.display = "none";
    view.setupScreen();
    if(game.round < Game.MAXROUNDS){
    view.game.drawDealer();
    }else{
    const playerscore = document.getElementById("finalplayerscore")
    const dealerscore = document.getElementById("finaldealerscore")
    const winner = document.getElementById("winner");
    const gameover = document.getElementById("gameover");
    const result = game.winner();
    console.log([playerscore,dealerscore,winner],"edits")
    playerscore.innerText = result[0];
    dealerscore.innerText = result[1];
    winner.innerText = result[2];
    overlay.style.display = "block";
    gameover.style.display = "block";
    }
   
})


window.game = game;
window.view = view;
