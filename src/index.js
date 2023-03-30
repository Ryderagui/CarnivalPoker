


const canvasEl = document.getElementById("canvas");
console.log(canvasEl);
let context = canvasEl.getContext("2d");
context.fillStyle = "#336600";
context.fillRect(200,0,800,300);
context.fillStyle = "#336600";
context.fillRect(200,450,800,300);
context.fillStyle = "#000000";
context.fillRect(200,150,400,150);
context.fillStyle = "#000000";
context.fillRect(200,450,400,150);
 
const card = new Image();
card.src = "images/Cards/Medium/Clubs_1.png";
card.onload = ()=>{
    context.drawImage(card,0,0,55,80);
}
// context.fillStyle = "#000000";
// context.fillRect(0,0,100,100);
console.log(card);
// context.drawImage(document.getElementsByTagName("img")[0],0,0,100,100);

