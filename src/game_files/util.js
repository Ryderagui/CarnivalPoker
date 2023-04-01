
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