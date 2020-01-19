const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/users");

// @route   GET api/users
// @desc    Register user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields!!!" });
  }

  // Check if user already exist
  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).json({
        msg: "User already Exist!"
      });
    // create new user
    const newUser = new User({
      name,
      email,
      password
    });

    // gen salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // Add to db
        newUser.save().then(user => {
          jwt.sign(
            {
              id: user.id
            },
            process.env.JWTSECRET || config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
