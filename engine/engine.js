/*

How the engine works
engine.init() will create the time out and objects that will hold the game data. gameData is an variable that is an object that will 
index games via game.id, created right now in game-routes.js

once init starts, it will create an game loop every X secs


*/

function createBase(x,y) {
    const mainBase = {
        hits : 100,
        hitsMax : 100,
        range : 10,
        attack : 2,
        attackSpeed : 1,
        visual: {
            img: "/imgs/head1.PNG",
            x:x,
            y:y
        }
        // cost;
        // level;
        // repawnTimer;
        // visual;

    }

    return {
        attack: function(){

        },
        death: function(){
    
        },
        get: function(){
            // this  returns an special object that is used for the front end.
            return {
                visual: mainBase.visual,
            };
        },
        setImage: function(erw){
            mainBase.visual.img = erw;
        }
    }
}


function initGame(Game){
    if(Game.playerOne.Base) return;
    console.log("Init game cause ya");
     Game.playerOne.Base = createBase(10,10);
     Game.playerTwo.Base = createBase(200,350);
     Game.playerTwo.Base.setImage("/imgs/head2.PNG");
}

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
//        console.log(_game);
        initGame(_game);
        

        // At the very end it'll send game data!
        console.log(_game.playerOne.Base.get());
        io.emit(gameId, [_game.playerOne.Base.get(),_game.playerTwo.Base.get()]); // this emits the game object via gameId.
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