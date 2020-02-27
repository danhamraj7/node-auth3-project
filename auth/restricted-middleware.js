const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //if a token exists
  //if there is, is it valid => rehash header + payload + secret
  // check if it matches verified signiture (handled by library)

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("failed verified", err);
        res.status(401).json({ Message: "Not verified" });
      } else {
        // token is valid
        req.decodedToken = decodedToken; // whatever endpoints we are working with to have access to certain info
        next();
      }
    });
  } else {
    res.status(400).json({
      Message: "No token provided"
    });
  }
};
