const router = require("express").Router();

const Users = require("./users-model.js");
//const restricted = require("../auth/restricted-middleware.js");

router.get("/", (req, res) => {
  //if the user is admin they can see all users
  //if the user is not admin they can only see their
  const { sub, dept } = req.decodedToken;
  if (dept === "admin") {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(500).send(err));
  } else {
    Users.findById(sub)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(500).send(err));
  }
});

module.exports = router;
