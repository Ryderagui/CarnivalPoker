const Game = require("./game_files/game")
const ViewGame = require("./game_files/view_game")

//Questions:
// Ask about event handelers and what should own them
// 


const windowWidth= window.innerWidth;
const windowHeight= window.innerHeight;
// console.log(windowWidth,windowHeight,"window X Y")
//Width,Height
// 1400,1000 with 1200,800. so +
// In essence, this is +- 25%
const canvasDimensions = [[900,600],[1200,800],[1500,1000]]
const gameCanvas = document.getElementById("canvas");
const gameCtx = gameCanvas.getContext("2d");
let canvasSize = canvasDimensions[0];

if((windowWidth)>(canvasDimensions[2][0]+200) && (windowHeight)>(canvasDimensions[2][1]+100)){
    canvasSize = canvasDimensions[2];
} else if(windowWidth>(canvasDimensions[1][0]+200) && (windowHeight>(canvasDimensions[1][1]+100))){
    canvasSize = canvasDimensions[1];
}else {
    canvasSize = canvasDimensions[0];
}
// console.log([windowWidth,canvasDimensions[1][0]+200,windowHeight,canvasDimensions[1][1]+100],"Deduce Canvas")

// console.log(canvasSize,"canvasSize")
gameCanvas.setAttribute("width",canvasSize[0])
gameCanvas.setAttribute("height",canvasSize[1])
const game = new Game (canvasSize);
const gameCanvasRect = gameCanvas.getBoundingClientRect();
const gamepos = [gameCanvasRect.x,gameCanvasRect.y];
// console.log(gamepos,"gamepos")
let view = new ViewGame(game,gameCtx,gamepos,canvasSize);
const overlay = document.getElementById("overlay");
const start = document.getElementById("start");
const gameover = document.getElementById("gameover");
const startbutton = document.getElementById("start-button");
const roundscore = document.getElementById("roundscore");
const continuebutton = document.getElementById("continuebutton");
const restartbutton = document.getElementById("restartbutton");
const instructions = document.getElementById("instructions");


startbutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    start.style.display = "none";
})

instructions.addEventListener('click',()=>{
    overlay.style.display = "block";
    start.style.display = "block";
})

continuebutton.addEventListener('click',()=>{
    overlay.style.display = "none";
    roundscore.style.display = "none";
    if(game.round < Game.MAXROUNDS){
        view.game.drawDealer();
        view.setupScreen();
    }else{
        const playerscore = document.getElementById("finalplayerscore")
        const dealerscore = document.getElementById("finaldealerscore")
        const winner = document.getElementById("winner");
        const result = game.winner();
        // console.log([playerscore,dealerscore,winner],"edits")
        playerscore.innerText = result[0];
        dealerscore.innerText = result[1];
        winner.innerText = result[2];
        overlay.style.display = "block";
        gameover.style.display = "block";
    }
    
   
})

restartbutton.addEventListener('click',()=>{
    const newGame = new Game (canvasSize);
    view = new ViewGame(newGame, gameCtx,gamepos,canvasSize);
    gameover.style.display = "none";
})


window.game = game;
window.view = view;
