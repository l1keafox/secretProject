const router = require("express").Router();
const User = require("../../models/User.js");
// CREATE New User
router.post("/", async (req, res) => {
  try {
    const createUser = await User.create({
      userName: req.body.username,
      password: req.body.password,
      longitude:req.body.longitude,
      latitude:req.body.latitude
//      groupId: groupID,
    });   
    console.log( req.id, req.body.username);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userName = req.body.username;
      res.status(200).json(createUser);
    });
    console.log(req.body.username,"created?");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login User

router.post("/login", async (req, res) => {
  try {
    const loginUser = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (!loginUser) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    // This is ulgy ULGY needs to be fixed.
    const validPassword = await loginUser.dataValues.password == req.body.password;

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Invalid login credentials. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: loginUser, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout User
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
