const diceRoll = (numOfDice, numOfSides) => {
    let value = 0;
    for (i = 0; i < numOfDice; i++) {
        const side = Math.floor(Math.random() * numOfSides + 1);
        console.log(side);
        value += side;
    }
    return value;
};

function distance(pos1,pos2){
    let a =Math.abs (pos1.x-pos2.x);
    let b =Math.abs (pos1.y-pos2.y);
    return Math.sqrt((a*a)+(b*b))
  }
  

module.exports = diceRoll;