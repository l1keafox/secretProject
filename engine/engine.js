/*

How the engine works
engine.init() will create the time out and objects that will hold the game data. gameData is an variable that is an object that will 
index games via game.id, created right now in game-routes.js

once init starts, it will create an game loop every X secs


*/

let gameData;// = {};
let intervalID;
const frames = 30;
// This goes through all current games to play.
function doGameLoop()
{
    for(let gameId in gameData){
 // Your code here
        let _game = gameData[gameId];
        //console.log(gameId,"testing", {msg:gameId});
        console.log(_game);

        

        // At the very end it'll send game data!
        io.emit(gameId, {msg:gameId}); // this emits the game object via gameId.
    }
}

function socketIns(socket){
    // These are emitted from the 
    //socket.on()
}


module.exports = {
    init : function() {
        gameData = {};
        intervalID = setInterval(doGameLoop, frames/1000);
    },
    // addGame function takes an Game.js object
    addGame : function(Game){  
        console.log("adding ", Game, "with id:",Game.id);
        gameData[Game.id] = Game;
        io.on('connection', socketIns);
    },
};