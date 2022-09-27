const router = require("express").Router();

const Game = require('./../../models/Game');

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
        lookForGame.playerOne = req.session.userName;
    } else {
        console.log('Found a game',lookForGame);
        lookForGame.playerTwo = req.session.userName;
        console.log( "Now we start the game, both users should now be going too ",lookForGame);
    }
    res.status(200).json([]);
  });

  router.get('/status',(req,res) =>{
    // This route is checked by the client side too see if they are in a game, when.
//    for(let game of lookForGame){
    let game = lookForGame;
    if(!game) {
        res.status(200).json({game:false});
        return;
    }
    if(game.playerOne === req.session.userName){
        if(game.playerTwo){
            res.status(201).json({game:true});
            return;
        }
    }
    if(game.playerTwo === req.session.userName){
        if(game.playerOne){
            res.status(201).json({game:true});
            return;
        }
    }
    res.status(200).json({game:false});

  //  }
  });
module.exports = router;