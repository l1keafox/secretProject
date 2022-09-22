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
      req.session.userName = req.body.userName;
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
router.put('/auth/id/:ioID', (req,res) => {
  //req.session.user.id
  //req.session.userName
  // and req.params.ioID should be the io session id
  console.log(req.session.userName, "Authicating ID:",req.params.ioID);
  if(!global.idTooUserObj) global.idTooUserObj = {};
  global.idTooUserObj[req.params.ioID] = req.session.userName;
  if(!global.userDataObj) global.userDataObj = {};
  global.userDataObj[req.session.userName] = {
    id:req.params.ioID,
    name:req.session.userName,
    score:0
  }
  res.status(200).json({});
});

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
