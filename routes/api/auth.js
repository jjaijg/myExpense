const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/users");

// @route   GET api/auth
// @desc    Authenticate user (Login)
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({
      id: "LOGIN",
      success: false,
      msg: "Please enter all fields!!!"
    });
  }

  // Check if user already exist
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(404).json({
        id: "LOGIN",
        success: false,
        msg: "User Does not Exist!"
      });
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({
          id: "LOGIN",
          success: false,
          msg: "Invalid Credentials"
        });
      // Make sure the user has been verified
      if (!user.isVerified)
        return res.status(401).send({
          id: "LOGIN",
          success: false,
          msg:
            "Your account has not been verified. Please verify your account >>> Menu -> verify"
        });

      jwt.sign(
        {
          id: user.id
        },
        process.env.JWTSECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            id: "LOGIN",
            success: true,
            msg: "SUCCESS",
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

// @route   GET api/auth/user
// @desc    Get user data for each request
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user =>
      res.json({
        id: "GET_USER",
        success: true,
        user,
        msg: "SUCCESS"
      })
    )
    .catch(err =>
      res.status(500).json({
        id: "GET_USER",
        success: false,
        msg: err.message
      })
    );
});

module.exports = router;
