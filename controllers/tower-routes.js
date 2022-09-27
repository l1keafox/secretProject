//routes for home page
const router = require("express").Router();
router.get("/", async (req, res) => {
        res.status(200).render("game", {
          loggedIn: req.session.loggedIn,
        });
//      res.status(200).json({});
  });
  
//use /utils/auth.js (getAuth) for any page that needs user to be logged in to access

module.exports = router;
