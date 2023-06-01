const Game = require("./game_files/game")
const ViewGame = require("./game_files/view_game")

//Questions:
// Ask about event handelers and what should own them
// 


const windowWidth= window.innerWidth;
const windowHeight= window.innerHeight;
console.log(windowWidth,windowHeight,"window X Y")
//Width,Height
// 1400,1000 with 1200,800. so +
// In essence, this is +- 25%
const canvasDimensions = [[900,600],[1200,800],[1500,1000]]
const gameCanvas = document.getElementById("canvas");
const gameCtx = gameCanvas.getContext("2d");
let canvasSize = canvasDimensions[0];

if((windowWidth)>(canvasDimensions[2][0]+200) && (windowHeight)>(canvasDimensions[2][1]+200)){
    canvasSize = canvasDimensions[2];
} else if(windowWidth>(canvasDimensions[1][0]+200) && (windowHeight>(canvasDimensions[1][1]+200))){
    canvasSize = canvasDimensions[1];
}else {
    canvasSize = canvasDimensions[0];
}
const roundScoreDimensions = [[920*0.75,666*0.75],[920,666],[920*1.25,666*1.25]]
const roundScore = document.getElementById("roundscore");
let roundScoreSize = roundScoreDimensions[1]; 

if((windowWidth>(canvasDimensions[2][0]+200)) && (windowHeight>(canvasDimensions[2][1]+200))){
    roundScoreSize = roundScoreDimensions[2];
} else if((windowWidth>(canvasDimensions[1][0]+200)) && (windowHeight>(canvasDimensions[1][1]+200))){
    roundScoreSize = roundScoreDimensions[1];
}else {
    roundScoreSize = roundScoreDimensions[0];
}

roundScore.setAttribute("width",roundScoreSize[0])
roundScore.setAttribute("height",roundScoreSize[1])



console.log(canvasSize,"canvasSize")
gameCanvas.setAttribute("width",canvasSize[0])
gameCanvas.setAttribute("height",canvasSize[1])
const game = new Game (canvasSize);
const gameCanvasRect = gameCanvas.getBoundingClientRect();
const gamepos = [gameCanvasRect.x,gameCanvasRect.y];
console.log(gamepos,"gamepos")
const view = new ViewGame(game,gameCtx,gamepos,canvasSize);
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
    if(game.round < Game.MAXROUNDS){
        view.game.drawDealer();
        view.setupScreen();
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
