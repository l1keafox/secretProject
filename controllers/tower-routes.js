//routes for home page
const router = require("express").Router();
router.get("/", async (req, res) => {
    try {
        
        res.render("game", {
          loggedIn: req.session.loggedIn,
        });

      res.status(500).json(err);
    }catch(err){
        console.log(err);
    }
  });
  
//use /utils/auth.js (getAuth) for any page that needs user to be logged in to access

module.exports = router;
