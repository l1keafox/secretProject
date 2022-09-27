/*

How the engine works
engine.init() will create the time out and objects that will hold the game data. gameData is an variable that is an object that will 
index games via game.id, created right now in game-routes.js

once init starts, it will create an game loop every X secs


*/

let gameData;// = {};
let intervalID;
const frames = 30;
function myCallback()
{
 // Your code here
 // Parameters are purely optional.
// console.log('loop yo');
    for(let gameId in gameData){
        console.log(gameId,gameData[gameId]);
        console.log(io);
        io.emit(gameId, {msg:gameId}); // This will
    }
}

function socketIns(){
    //socket.on()
}


module.exports = {
    init : function() {
        io.on('connection', socketIns);
        gameData = {};
        intervalID = setInterval(myCallback, frames/1000);
    },
    // addGame function takes an Game.js object
    addGame : function(Game){  
        console.log("adding ", Game, "with id:",Game.id);
        gameData[Game.id] = Game;
    },
};