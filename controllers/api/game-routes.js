const router = require("express").Router();

const Game = require('./../../models/Game');

const {Engine} = require("./../../engine");

let lookForGame;
router.put('/join/', (req,res) => {
    //req.session.user.id
    //req.session.userName
    // and req.params.ioID should be the io session id
    console.log(req.session.userName, "Looking for game");
    console.log("Is there a game?",lookForGame);
    if(!lookForGame){
        console.log('Create Game',lookForGame);
        lookForGame = new Game();
        lookForGame.id = 1001+Math.floor(Math.random()*10)+"x";
        lookForGame.playerOne.name = req.session.userName;
    } else {
        console.log('Found a game',lookForGame);
        lookForGame.playerTwo.name = req.session.userName;
        console.log( "Now we start the game, both users should now be going too ",lookForGame);
    }
    res.status(200).json([]);
  });

  router.get('/status',(req,res)=>{
    res.status(200).json(req.session.game);
  });

  router.get('/joinStatus',(req,res) =>{
    // This route is checked by the client side too see if they are in a game, when.
//    for(let game of lookForGame){
    let game = lookForGame;
    if(!game) {
        res.status(200).json(false);
        return;
    }
    if(game.playerOne.name === req.session.userName){
        if(game.playerTwo.name){
            Engine.addGame(lookForGame);
            req.session.save(() => {
                req.session.game = lookForGame;
                 res
                   .status(201)
                   .json(lookForGame);
              });
             return;
       }
    }
    if(game.playerTwo.name === req.session.userName){
        if(game.playerOne.name){
            Engine.addGame(lookForGame);
            req.session.save(() => {
                req.session.game = lookForGame;
                 res
                   .status(201)
                   .json(lookForGame);
              });
            return;
        }
    }
    res.status(200).json(false);

  //  }
  });
module.exports = router;
