
export function sortCards(array){
        function sorter(card1,card2){
            //Return 1 if card 1 > card 2
            //Return -1 if card 1 < card 2
            const suits = ["Spades","Hearts","Diamond","Clubs"]
            if(card1.value>card2.value){
                return 1
            }else if(card1.value<card2.value){
                return -1 
            }else{
                if(suits.indexOf(card1.suit)<suits.indexOf(card2.suit)){
                    return 1
                }else{
                    return -1 
                }
            }
        }
        let pivot = array[0];
        if(array.length < 2) return array;
        let left = array.slice(1).filter((ele) => sorter(pivot,ele) === -1);
        let right = array.slice(1).filter((ele) => sorter(pivot,ele) === 1);
        let leftSorted = sortCards(left);
        let rightSorted = sortCards(right);
        return leftSorted.concat([pivot]).concat(rightSorted);
    }
export function createPoints(pos,box){
        const points =[{
            x: pos[0],
            y: pos[1]
        },{
            x: pos[0]+box[0],
            y: pos[1]
        },{
            x: pos[0]+box[0],
            y: pos[1]+box[1]
        },{
            x: pos[0],
            y: pos[1]+box[1]
        }
    ];
    return points;
}

export function canvasSize() {
    const windowWidth= window.innerWidth;
    const windowHeight= window.innerHeight;
    const canvasDimensions = [[900,600],[1200,800],[1500,1000]]
    let canvasSize = canvasDimensions[0];
    if((windowWidth)>(canvasDimensions[2][0]+200) && (windowHeight)>(canvasDimensions[2][1]+100)){
        canvasSize = canvasDimensions[2];
        return {canvasSize: canvasSize, size: "Large"}
    } else if(windowWidth>(canvasDimensions[1][0]+200) && (windowHeight>(canvasDimensions[1][1]+100))){
        canvasSize = canvasDimensions[1];
        return {canvasSize: canvasSize, size: "Medium"}
    }else {
        canvasSize = canvasDimensions[0];
        return {canvasSize: canvasSize, size: "Small"}
    }
}