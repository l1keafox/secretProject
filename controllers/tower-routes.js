//routes for home page
const router = require("express").Router();
router.get("/", async (req, res) => {
//  if (!req.session || !req.session.game) {
  //} else {
    res.status(200).render("game", {
      loggedIn: req.session.loggedIn,
      game: req.session.game,
    });
//  }
});

//use /utils/auth.js (getAuth) for any page that needs user to be logged in to access

module.exports = router;
